const FEISHU_HOST = "https://open.feishu.cn";

function getEnv(name, required = true) {
  const value = process.env[name];
  if (required && !value) throw new Error(`${name} is not configured.`);
  return value || "";
}

function isConfigured() {
  return Boolean(process.env.FEISHU_APP_ID && process.env.FEISHU_APP_SECRET && process.env.FEISHU_REDIRECT_URI && process.env.CONTENT_FACTORY_APP_TOKEN);
}

function getFrontendUrl(path = "") {
  const origin = (process.env.FRONTEND_ORIGIN || "https://qizhuxia.github.io/tiktok-content-factory-dashboard").replace(/\/$/, "");
  return `${origin}${path}`;
}

function buildAuthUrl(state) {
  const appId = getEnv("FEISHU_APP_ID");
  const redirectUri = getEnv("FEISHU_REDIRECT_URI");
  const url = new URL("/open-apis/authen/v1/index", FEISHU_HOST);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  return url.toString();
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};
  if (!response.ok || payload.code) {
    const error = new Error(payload.msg || `Feishu request failed: ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function getAppAccessToken() {
  const payload = await requestJson(`${FEISHU_HOST}/open-apis/auth/v3/app_access_token/internal`, {
    method: "POST",
    body: JSON.stringify({
      app_id: getEnv("FEISHU_APP_ID"),
      app_secret: getEnv("FEISHU_APP_SECRET")
    })
  });
  return payload.app_access_token || payload.data?.app_access_token;
}

async function exchangeCodeForUserToken(code) {
  const appAccessToken = await getAppAccessToken();
  const payload = await requestJson(`${FEISHU_HOST}/open-apis/authen/v1/access_token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${appAccessToken}`
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code
    })
  });
  return payload.data || payload;
}

async function feishuGet(path, userAccessToken, query = {}) {
  const url = new URL(`/open-apis/${path.replace(/^\//, "")}`, FEISHU_HOST);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });
  const payload = await requestJson(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }
  });
  return payload.data || payload;
}

async function feishuPost(path, userAccessToken, body = {}) {
  const payload = await requestJson(`${FEISHU_HOST}/open-apis/${path.replace(/^\//, "")}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    },
    body: JSON.stringify(body)
  });
  return payload.data || payload;
}

async function feishuPut(path, userAccessToken, body = {}) {
  const payload = await requestJson(`${FEISHU_HOST}/open-apis/${path.replace(/^\//, "")}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    },
    body: JSON.stringify(body)
  });
  return payload.data || payload;
}

async function listTables(userAccessToken) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  const tables = [];
  let pageToken = "";
  do {
    const data = await feishuGet(`bitable/v1/apps/${encodeURIComponent(appToken)}/tables`, userAccessToken, {
      page_size: 100,
      page_token: pageToken
    });
    tables.push(...(data.items || []));
    pageToken = data.page_token || "";
  } while (pageToken);
  return tables;
}

async function listFields(userAccessToken, tableId) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  const fields = [];
  let pageToken = "";
  do {
    const data = await feishuGet(`bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields`, userAccessToken, {
      page_size: 100,
      page_token: pageToken
    });
    fields.push(...(data.items || []));
    pageToken = data.page_token || "";
  } while (pageToken);
  return fields;
}

async function getRecordCount(userAccessToken, tableId) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  const data = await feishuGet(`bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`, userAccessToken, {
    page_size: 1
  });
  return Number(data.total || data.total_count || (data.items || []).length || 0);
}

async function getTableSnapshots(userAccessToken) {
  const tables = await listTables(userAccessToken);
  const selectedNames = parseNameList(process.env.CONTENT_FACTORY_TABLES || "");
  const visibleTables = selectedNames.length
    ? tables.filter((table) => selectedNames.includes(table.name))
    : tables;

  const snapshots = [];
  for (const table of visibleTables) {
    const [fields, count] = await Promise.all([
      listFields(userAccessToken, table.table_id),
      getRecordCount(userAccessToken, table.table_id)
    ]);
    snapshots.push({
      name: table.name,
      type: "table",
      count,
      fields: fields.map((field) => field.field_name).filter(Boolean),
      url: buildTableUrl(table.table_id)
    });
  }
  return snapshots;
}

async function findTableByName(userAccessToken, tableName) {
  const tables = await listTables(userAccessToken);
  return tables.find((table) => table.name === tableName) || null;
}

async function listTableRecords(userAccessToken, tableId, fieldNames = []) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  const records = [];
  let pageToken = "";
  do {
    const query = {
      page_size: 100,
      page_token: pageToken
    };
    if (fieldNames.length) query.field_names = JSON.stringify(fieldNames);
    const data = await feishuGet(`bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`, userAccessToken, query);
    records.push(...(data.items || []));
    pageToken = data.page_token || "";
  } while (pageToken);
  return records;
}

async function getTableRecord(userAccessToken, tableId, recordId, fieldNames = []) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  const query = {};
  if (fieldNames.length) query.field_names = JSON.stringify(fieldNames);
  return feishuGet(`bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`, userAccessToken, query);
}

async function updateTableRecord(userAccessToken, tableId, recordId, fields) {
  const appToken = getEnv("CONTENT_FACTORY_APP_TOKEN");
  return feishuPut(
    `bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`,
    userAccessToken,
    { fields }
  );
}

function buildTableUrl(tableId) {
  const baseUrl = (process.env.CONTENT_FACTORY_BASE_URL || "").trim();
  if (!baseUrl) return "";
  const url = new URL(baseUrl);
  url.searchParams.set("table", tableId);
  return url.toString();
}

function parseNameList(value) {
  return String(value || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

module.exports = {
  isConfigured,
  getFrontendUrl,
  buildAuthUrl,
  exchangeCodeForUserToken,
  getTableSnapshots,
  findTableByName,
  listTableRecords,
  getTableRecord,
  updateTableRecord,
  buildTableUrl
};
