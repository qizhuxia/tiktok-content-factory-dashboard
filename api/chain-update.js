const { applyCors, json, requireSession } = require("./_lib/http");
const { isConfigured, getTableRecord, updateTableRecord } = require("./_lib/feishu");

const TRACKING_TABLE_ID = "tblqy9hRLYBCKjba";
const VERIFY_FIELDS = ["内容ID", "发布状态", "数据回流状态", "当前卡点", "下一步动作", "备注"];

const ACTIONS = {
  waiting_data: {
    label: "标记待回流",
    fields: {
      "数据回流状态": "待回流",
      "当前卡点": "已发布，等待视频数据/商品点击数据回流。",
      "下一步动作": "更新对应地区的视频数据和商品点击数据后，再回到本表确认数据回流。"
    }
  },
  clear_conflict: {
    label: "标记冲突已处理",
    fields: {
      "当前卡点": "",
      "下一步动作": "数据冲突已人工校验，进入下一轮观察或复盘。"
    }
  },
  needs_publish_info: {
    label: "标记待补发布信息",
    fields: {
      "当前卡点": "缺发布时间、发布账号或视频链接。",
      "下一步动作": "补齐发布时间、发布账号和视频链接。"
    }
  }
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 64) {
        reject(new Error("payload_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "POST") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  if (!isConfigured()) return json(req, res, 503, { ok: false, error: "feishu_not_configured" });

  const session = requireSession(req, res);
  if (!session) return;

  try {
    const body = await readBody(req);
    const recordId = String(body.recordId || "");
    const action = ACTIONS[String(body.action || "")];
    if (!/^rec/.test(recordId)) return json(req, res, 400, { ok: false, error: "invalid_record" });
    if (!action) return json(req, res, 400, { ok: false, error: "invalid_action" });

    await updateTableRecord(session.accessToken, TRACKING_TABLE_ID, recordId, action.fields);
    const updated = await getTableRecord(session.accessToken, TRACKING_TABLE_ID, recordId, VERIFY_FIELDS);
    return json(req, res, 200, {
      ok: true,
      action: action.label,
      record: {
        fields: updated.record?.fields || updated.fields || {}
      }
    });
  } catch (error) {
    return json(req, res, error.status || 500, {
      ok: false,
      error: "chain_update_failed",
      message: error.payload?.msg || error.message
    });
  }
};
