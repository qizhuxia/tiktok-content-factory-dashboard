const fs = require("fs");
const path = require("path");
const { buildTableUrl, findTableByName, getTableRecord, getTableSnapshots, listTableRecords } = require("./feishu");

const SOURCE_TABLES = ["爆款视频脚本收集表", "开头钩子收集", "中间叙事逻辑收集"];
const DATA_TABLES = ["视频数据-英区", "视频数据-美区", "达人精灵数据下载-英区", "达人精灵数据下载-美区", "商品点击数据-英区", "商品点击数据-美区"];
const LIBRARY_TABLES = ["钩子库", "卖点库", "痛点库", "选题库", "卖点可视化库", "高光帧库"];
const PLAN_TABLES = ["内容周测试计划表"];
const REVIEW_TABLES = ["内容周复盘表"];
const DAILY_TABLE = "内容生产环节日报";
const DAILY_FIELDS = ["日报标题", "日期", "所属周", "环节", "今日新增数", "今日完成数", "本周累计数", "数据来源表", "统计口径", "卡点", "证据入口"];
const TRACKING_TABLE = "内容生产全链路追踪表";
const TRACKING_FIELDS = [
  "内容ID",
  "链路唯一键",
  "周起始日",
  "周次命名",
  "地区",
  "发布地区",
  "内容类型",
  "脚本文档",
  "脚本标题/选题",
  "脚本状态",
  "剪辑状态",
  "发布状态",
  "数据回流状态",
  "成片文件夹",
  "成片文件名",
  "发布时间",
  "发布账号",
  "视频链接",
  "播放量",
  "CTR",
  "CVR",
  "ROI",
  "数据日期",
  "复盘结论",
  "结果判定",
  "当前卡点",
  "下一步动作",
  "备注",
  "关联视频数据-美区",
  "关联视频数据-英区",
  "关联商品点击数据-美区",
  "关联商品点击数据-英区"
];
const VIDEO_DATA_TABLES = {
  US: "tbly9uWaQKseUmxa",
  UK: "tblJglRnYGoeOfvf"
};
const VIDEO_DATA_FIELDS = ["Video/Photo Views", "整体数据提取", "视频链接", "视频ID", "账号ID"];
const SEGMENT_ORDER = ["爆款样本新增", "开头钩子拆解", "中间叙事拆解", "音乐新增", "脚本新增", "视频发布", "数据回流", "复盘完成", "六库新增"];
const SEGMENT_TARGETS = {
  "爆款样本新增": "source",
  "开头钩子拆解": "deconstruct",
  "中间叙事拆解": "deconstruct",
  "音乐新增": "bgm",
  "脚本新增": "script",
  "视频发布": "publish",
  "数据回流": "data",
  "复盘完成": "review",
  "六库新增": "libraries"
};

function readSnapshot() {
  const file = path.join(process.cwd(), "dashboard-data.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function safeText(value) {
  return String(value || "").replace(/(open_id|record_id|field_id|access_token|refresh_token|app_secret)/gi, "[hidden]");
}

function groupResources(resources, names) {
  return resources.filter((resource) => names.includes(resource.name));
}

function countResources(resources, names) {
  return groupResources(resources, names).reduce((sum, resource) => sum + Number(resource.count || 0), 0);
}

function scalarCell(value) {
  if (value == null) return "";
  if (Array.isArray(value)) {
    if (!value.length) return "";
    if (value.every((item) => typeof item === "string")) return value.join("、");
    return value.map(scalarCell).filter(Boolean).join("、");
  }
  if (typeof value === "object") {
    if (value.text != null) return scalarCell(value.text);
    if (value.name != null) return scalarCell(value.name);
    if (value.link != null && value.text != null) return `[${value.text}](${value.link})`;
    return Object.values(value).map(scalarCell).filter(Boolean).join("、");
  }
  return value;
}

function textCell(fields, name) {
  return safeText(scalarCell(fields?.[name]));
}

function numberCell(fields, name) {
  const value = Number(scalarCell(fields?.[name]) || 0);
  return Number.isFinite(value) ? value : 0;
}

function dateCell(fields, name) {
  const value = scalarCell(fields?.[name]);
  if (!value) return "";
  if (typeof value === "number" || /^\d{10,13}$/.test(String(value))) {
    const timestamp = Number(value);
    const date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }
  return safeText(value);
}

function firstText(fields, names) {
  for (const name of names) {
    const value = textCell(fields, name);
    if (value) return value;
  }
  return "";
}

function selectText(fields, name) {
  return textCell(fields, name);
}

function linkIds(fields, name) {
  const value = fields?.[name];
  if (!Array.isArray(value)) return [];
  return value.map((item) => item?.id).filter(Boolean);
}

function parseRecordFields(record) {
  return record?.fields || {};
}

function extractVideoViewsFromRaw(value) {
  const text = scalarCell(value);
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    const candidates = [
      parsed.Videoviews,
      parsed.videoViews,
      parsed["Video/Photo Views"],
      parsed.views,
      parsed.playCount
    ];
    for (const candidate of candidates) {
      const number = Number(String(candidate ?? "").replace(/[^\d.]/g, ""));
      if (Number.isFinite(number) && number > 0) return number;
    }
  } catch {
    const match = text.match(/(?:Videoviews|Video\/Photo Views|views)["':\s]+([\d,]+)/i);
    if (match) {
      const number = Number(match[1].replace(/,/g, ""));
      if (Number.isFinite(number)) return number;
    }
  }
  return null;
}

function weekSortKey(weekName) {
  const match = String(weekName || "").match(/第([一二三四五六七八九十\d]+)周/);
  if (!match) return 999;
  const text = match[1];
  const map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  return Number(text) || map[text] || 999;
}

function statusDone(value, doneWords) {
  const text = String(value || "");
  return doneWords.some((word) => text.includes(word));
}

function buildIssueList(chain) {
  const issues = [];
  if (chain.script !== "已写") issues.push("脚本还没有标记为已写。");
  if (chain.cut !== "已成片") issues.push("还没有成片，或成片文件名没有回填。");
  if (chain.cut === "已成片" && !chain.fileName) issues.push("剪辑状态是已成片，但缺成片文件名。");
  if (chain.publish === "已发布" && !chain.videoUrl) issues.push("已发布，但缺视频链接。");
  if (chain.publish === "已发布" && !chain.publishTime) issues.push("已发布，但缺发布时间。");
  if (chain.publish === "已发布" && !chain.publishAccount) issues.push("已发布，但缺发布账号。");
  if (chain.data === "已回流" && chain.metrics?.views == null) issues.push("数据已回流，但播放量为空。");
  if (chain.rawMetrics?.views != null && chain.metrics?.views != null && chain.rawMetrics.views !== chain.metrics.views) {
    issues.push(`播放量冲突：追踪表=${chain.metrics.views}，原始提取=${chain.rawMetrics.views}。`);
  }
  if (chain.blocker) issues.push(chain.blocker);
  return [...new Set(issues)];
}

async function attachVideoData(userAccessToken, chain) {
  const tableId = VIDEO_DATA_TABLES[chain.region];
  const linkedIds = chain.region === "UK" ? chain.videoDataUkIds : chain.videoDataUsIds;
  if (!tableId || !linkedIds?.length) return chain;
  try {
    const data = await getTableRecord(userAccessToken, tableId, linkedIds[0], VIDEO_DATA_FIELDS);
    const fields = parseRecordFields(data.record || data);
    const rawViews = extractVideoViewsFromRaw(fields["整体数据提取"]);
    const structuredViews = numberCell(fields, "Video/Photo Views") || null;
    const videoUrl = chain.videoUrl || textCell(fields, "视频链接");
    return {
      ...chain,
      videoUrl,
      dataSource: `${chain.region === "UK" ? "视频数据-英区" : "视频数据-美区"} / 已关联`,
      matchMethod: "追踪表关联视频数据",
      rawMetrics: {
        ...chain.rawMetrics,
        views: rawViews
      },
      sourceMetrics: {
        views: structuredViews,
        rawViews
      }
    };
  } catch (error) {
    return {
      ...chain,
      dataSource: `${chain.dataSource || "视频数据表"} / 关联读取失败`,
      sourceReadError: error.payload?.msg || error.message
    };
  }
}

function normalizeChain(record) {
  const fields = parseRecordFields(record);
  const region = firstText(fields, ["发布地区", "地区"]);
  const chain = {
    recordId: record.record_id,
    id: firstText(fields, ["内容ID", "链路唯一键"]),
    key: firstText(fields, ["链路唯一键", "内容ID"]),
    week: textCell(fields, "周次命名") || "未分周",
    weekStart: dateCell(fields, "周起始日"),
    region,
    type: selectText(fields, "内容类型") || "未分类",
    scriptDoc: selectText(fields, "脚本文档"),
    title: textCell(fields, "脚本标题/选题"),
    script: selectText(fields, "脚本状态") || "未知",
    cut: selectText(fields, "剪辑状态") || "未知",
    publish: selectText(fields, "发布状态") || "未知",
    data: selectText(fields, "数据回流状态") || "未知",
    review: selectText(fields, "结果判定") || (textCell(fields, "复盘结论") ? "已复盘" : "未复盘"),
    folder: textCell(fields, "成片文件夹"),
    fileName: textCell(fields, "成片文件名"),
    publishTime: dateCell(fields, "发布时间"),
    publishAccount: textCell(fields, "发布账号"),
    videoUrl: textCell(fields, "视频链接").replace(/^\[(.*?)\]\((.*?)\)$/, "$2"),
    dataDate: dateCell(fields, "数据日期"),
    metrics: {
      views: Number.isFinite(numberCell(fields, "播放量")) && numberCell(fields, "播放量") > 0 ? numberCell(fields, "播放量") : null,
      ctr: Number.isFinite(numberCell(fields, "CTR")) && numberCell(fields, "CTR") > 0 ? numberCell(fields, "CTR") : null,
      cvr: Number.isFinite(numberCell(fields, "CVR")) && numberCell(fields, "CVR") > 0 ? numberCell(fields, "CVR") : null,
      roi: Number.isFinite(numberCell(fields, "ROI")) && numberCell(fields, "ROI") > 0 ? numberCell(fields, "ROI") : null
    },
    rawMetrics: {},
    blocker: textCell(fields, "当前卡点"),
    next: textCell(fields, "下一步动作"),
    note: textCell(fields, "备注"),
    dataSource: "内容生产全链路追踪表",
    matchMethod: "内容ID / 链路唯一键",
    videoDataUsIds: linkIds(fields, "关联视频数据-美区"),
    videoDataUkIds: linkIds(fields, "关联视频数据-英区"),
    productDataUsIds: linkIds(fields, "关联商品点击数据-美区"),
    productDataUkIds: linkIds(fields, "关联商品点击数据-英区")
  };
  chain.issues = buildIssueList(chain);
  return chain;
}

function summarizeWeek(week, chains) {
  const total = chains.length;
  const scriptDone = chains.filter((chain) => statusDone(chain.script, ["已写", "已选用"])).length;
  const cutDone = chains.filter((chain) => statusDone(chain.cut, ["已成片"])).length;
  const publishDone = chains.filter((chain) => statusDone(chain.publish, ["已发布"])).length;
  const dataDone = chains.filter((chain) => statusDone(chain.data, ["已回流"])).length;
  const issues = chains.filter((chain) => chain.issues?.length).length;
  return {
    id: week,
    label: week,
    total,
    scriptDone,
    cutDone,
    publishDone,
    dataDone,
    issues,
    remaining: {
      script: total - scriptDone,
      cut: total - cutDone,
      publish: total - publishDone,
      data: publishDone - dataDone
    }
  };
}

async function getContentChains(userAccessToken) {
  const table = await findTableByName(userAccessToken, TRACKING_TABLE);
  if (!table) return { table: null, chains: [], weeks: [] };
  const records = await listTableRecords(userAccessToken, table.table_id, TRACKING_FIELDS);
  const chains = [];
  for (const record of records) {
    const attached = await attachVideoData(userAccessToken, normalizeChain(record));
    attached.issues = buildIssueList(attached);
    chains.push(attached);
  }
  chains.sort((a, b) => weekSortKey(a.week) - weekSortKey(b.week) || String(a.id).localeCompare(String(b.id), "zh-CN"));
  const groups = new Map();
  chains.forEach((chain) => {
    if (!groups.has(chain.week)) groups.set(chain.week, []);
    groups.get(chain.week).push(chain);
  });
  const weeks = [...groups.entries()].map(([week, items]) => summarizeWeek(week, items));
  return {
    table: {
      name: table.name,
      type: "table",
      count: records.length,
      fields: TRACKING_FIELDS,
      url: buildTableUrl(table.table_id)
    },
    chains,
    weeks
  };
}

function buildMetricsFromChains(metrics, chainData, latestReports) {
  const chains = chainData.chains || [];
  const weekTotal = chains.length;
  const todayAdded = latestReports.reduce((sum, report) => sum + report.todayAdded, 0);
  return {
    ...metrics,
    todayAdded,
    weekTotal,
    trackedSegments: 4,
    blockedSegments: chains.filter((chain) => chain.issues?.length).length,
    chainTotal: chains.length,
    scriptDone: chains.filter((chain) => statusDone(chain.script, ["已写", "已选用"])).length,
    cutDone: chains.filter((chain) => statusDone(chain.cut, ["已成片"])).length,
    publishDone: chains.filter((chain) => statusDone(chain.publish, ["已发布"])).length,
    dataDone: chains.filter((chain) => statusDone(chain.data, ["已回流"])).length
  };
}

function normalizeDailyReports(records) {
  return records
    .map((record) => {
      const fields = record.fields || {};
      const segment = textCell(fields, "环节");
      const date = dateCell(fields, "日期");
      return {
        id: `${date || "unknown"}-${segment || "segment"}`,
        title: textCell(fields, "日报标题"),
        date,
        week: textCell(fields, "所属周"),
        segment,
        todayAdded: numberCell(fields, "今日新增数"),
        todayDone: numberCell(fields, "今日完成数"),
        weekTotal: numberCell(fields, "本周累计数"),
        sourceTable: textCell(fields, "数据来源表"),
        rule: textCell(fields, "统计口径"),
        blocker: textCell(fields, "卡点"),
        evidenceUrl: textCell(fields, "证据入口"),
        target: SEGMENT_TARGETS[segment] || "automation"
      };
    })
    .filter((item) => item.segment)
    .sort((a, b) => {
      const dateCompare = String(b.date || "").localeCompare(String(a.date || ""));
      if (dateCompare) return dateCompare;
      return SEGMENT_ORDER.indexOf(a.segment) - SEGMENT_ORDER.indexOf(b.segment);
    });
}

function latestDailyReports(reports) {
  const latestDate = reports[0]?.date || "";
  return reports.filter((report) => report.date === latestDate);
}

function progressPercent(report, mode) {
  if (report.blocker) return report.weekTotal || report.todayAdded ? 30 : 15;
  if (mode === "daily") return report.todayAdded ? Math.min(100, 60 + report.todayAdded * 5) : report.weekTotal ? 35 : 10;
  return report.weekTotal ? Math.min(100, 35 + report.weekTotal * 4) : 10;
}

function buildProgressFromDaily(reports, mode = "daily") {
  return reports.map((report) => ({
    target: report.target,
    segment: report.segment,
    title: report.segment,
    status: `今日 ${report.todayAdded} / 本周 ${report.weekTotal}${report.blocker ? " / 卡点" : ""}`,
    progress: progressPercent(report, mode),
    evidence: `${report.sourceTable}：今日新增 ${report.todayAdded}，今日完成 ${report.todayDone}，本周累计 ${report.weekTotal}。`,
    blocker: report.blocker || "暂无明确卡点。",
    next: report.blocker || "继续按当前统计口径推进，并在源表/文档里留下可回读证据。",
    rule: report.rule,
    evidenceUrl: report.evidenceUrl
  }));
}

function buildMetricsFromDaily(metrics, reports) {
  return {
    ...metrics,
    todayAdded: reports.reduce((sum, report) => sum + report.todayAdded, 0),
    weekTotal: reports.reduce((sum, report) => sum + report.weekTotal, 0),
    trackedSegments: reports.length,
    blockedSegments: reports.filter((report) => report.blocker).length
  };
}

function buildActionsFromDaily(reports) {
  const blockers = reports.filter((report) => report.blocker);
  const active = [...reports].sort((a, b) => b.weekTotal - a.weekTotal).filter((report) => report.weekTotal || report.todayAdded);
  const items = blockers.length ? blockers : active;
  return items.slice(0, 5).map((report) => ({
    title: blockers.length ? `${report.segment}：先处理卡点` : `${report.segment}：继续推进`,
    detail: report.blocker || `${report.sourceTable} 本周累计 ${report.weekTotal}，今天新增 ${report.todayAdded}。`
  }));
}

function buildActionsFromChains(chainData) {
  const chains = chainData.chains || [];
  const missingCut = chains.filter((chain) => !statusDone(chain.cut, ["已成片"])).length;
  const missingPublish = chains.filter((chain) => statusDone(chain.cut, ["已成片"]) && !statusDone(chain.publish, ["已发布"])).length;
  const missingData = chains.filter((chain) => statusDone(chain.publish, ["已发布"]) && !statusDone(chain.data, ["已回流"])).length;
  const conflicts = chains.filter((chain) => /冲突/.test(`${chain.data} ${chain.issues?.join(" ")}`)).length;
  return [
    missingCut ? { title: "先补剪辑缺口", detail: `还有 ${missingCut} 条脚本没有可确认成片。` } : null,
    missingPublish ? { title: "再推发布", detail: `已有成片但未发布 ${missingPublish} 条，优先补发布时间、账号和视频链接。` } : null,
    missingData ? { title: "补数据回流", detail: `已发布但未回流 ${missingData} 条，先更新视频数据和商品点击数据。` } : null,
    conflicts ? { title: "处理数据冲突", detail: `${conflicts} 条内容存在播放量或状态冲突，复盘前先校验。` } : null
  ].filter(Boolean).slice(0, 4);
}

function buildGapsFromDaily(reports, fallbackGaps) {
  const blockers = reports.filter((report) => report.blocker);
  if (!blockers.length) return fallbackGaps || [];
  return blockers.map((report) => ({
    title: report.segment,
    detail: report.blocker
  }));
}

async function getDailyReports(userAccessToken) {
  const table = await findTableByName(userAccessToken, DAILY_TABLE);
  if (!table) return { table: null, reports: [] };
  const records = await listTableRecords(userAccessToken, table.table_id, DAILY_FIELDS);
  return {
    table: {
      name: table.name,
      type: "table",
      count: records.length,
      fields: DAILY_FIELDS,
      url: buildTableUrl(table.table_id)
    },
    reports: normalizeDailyReports(records)
  };
}

function buildLibraries(snapshot, resources) {
  const fallback = snapshot.libraries || {};
  return {
    "audience-pain": {
      ...(fallback["audience-pain"] || {}),
      count: `${resourceCount(resources, "痛点库")} 条痛点`
    },
    hook: {
      ...(fallback.hook || {}),
      count: `${resourceCount(resources, "钩子库")} 条表达`
    },
    selling: {
      ...(fallback.selling || {}),
      count: `${resourceCount(resources, "卖点库")} 条卖点`
    },
    scene: {
      ...(fallback.scene || {}),
      count: `高光帧 ${resourceCount(resources, "高光帧库")} 条`
    },
    material: fallback.material || {},
    bgm: fallback.bgm || {}
  };
}

function resourceCount(resources, name) {
  return Number(resources.find((resource) => resource.name === name)?.count || 0);
}

function buildTodayActions(resources) {
  const pendingPlans = resourceCount(resources, "内容周测试计划表");
  const pendingReviews = resourceCount(resources, "内容周复盘表");
  return [
    {
      title: pendingPlans ? "先检查周测发布链路" : "先建立本周周测计划",
      detail: pendingPlans ? "从内容周测试计划表进入，确认脚本、发布账号、已发布数和数据回流字段。" : "没有可读周测记录时，先把本周测试假设建起来。"
    },
    {
      title: pendingReviews ? "把发布后数据推到复盘" : "先补复盘入口",
      detail: "视频数据、达人精灵和商品点击数据只属于数据回流；复盘页只吃这些结果，不再混进爆款收集。"
    },
    {
      title: "补六库可回查字段",
      detail: "钩子、卖点、痛点、高光帧要能回查到来源爆款、周测计划和发布后表现。"
    }
  ];
}

function buildWeeklyProgress(resources) {
  const viral = countResources(resources, SOURCE_TABLES);
  const dataReturn = countResources(resources, DATA_TABLES);
  const weeklyPlans = countResources(resources, PLAN_TABLES);
  const reviews = countResources(resources, REVIEW_TABLES);
  const libraryAssets = countResources(resources, LIBRARY_TABLES);

  return [
    {
      target: "source",
      title: "爆款样本与拆解入口",
      status: viral ? "推进中" : "待补样本",
      progress: viral ? 60 : 10,
      evidence: `可读爆款/拆解记录合计 ${viral} 条。`,
      blocker: "新增样本必须保留来源，并稳定拆到钩子、叙事和卖点。",
      next: "本周优先补新增爆款样本的拆解完整度。"
    },
    {
      target: "script",
      title: "周测计划到脚本生产",
      status: weeklyPlans ? "推进中" : "待建立",
      progress: weeklyPlans ? 45 : 10,
      evidence: `可读周测计划 ${weeklyPlans} 条。`,
      blocker: "脚本、素材、账号、发布时间要回到同一条周测计划。",
      next: "逐条检查本周计划的生产状态和发布状态。"
    },
    {
      target: "data",
      title: "发布后数据回流",
      status: dataReturn ? "推进中" : "待回流",
      progress: dataReturn ? 50 : 10,
      evidence: `可读视频数据/达人精灵/商品点击记录合计 ${dataReturn} 条。`,
      blocker: "数据回流必须绑定周测计划，不能混进爆款收集。",
      next: "统一检查英区/美区数据回流是否关联到本周计划。"
    },
    {
      target: "review",
      title: "复盘结论与六库反哺",
      status: reviews ? "待补结论" : "待建立",
      progress: reviews ? 30 : 10,
      evidence: `可读复盘记录 ${reviews} 条。`,
      blocker: "没有复盘结论时，六库无法判断哪类资产有效。",
      next: "按观察周期补本周结论和下周动作。"
    },
    {
      target: "libraries",
      title: "六库有效性回查",
      status: libraryAssets ? "需要补数据" : "待补库",
      progress: libraryAssets ? 40 : 10,
      evidence: `可读六库资产 ${libraryAssets} 条。`,
      blocker: "库资产需要关联来源、周测计划、使用记录和发布后表现。",
      next: "先补使用记录和表现字段，再做库资产优先级。"
    }
  ];
}

function buildDailyProgress(resources) {
  const dataReturn = countResources(resources, DATA_TABLES);
  const weeklyPlans = countResources(resources, PLAN_TABLES);
  const reviews = countResources(resources, REVIEW_TABLES);
  const libraryAssets = countResources(resources, LIBRARY_TABLES);

  return [
    {
      target: "publish",
      title: "今日发布推进",
      status: weeklyPlans ? "待核对" : "待建立计划",
      progress: weeklyPlans ? 35 : 10,
      evidence: `可读周测计划 ${weeklyPlans} 条；需要按发布状态继续细分今日项。`,
      blocker: "当前只读聚合先按记录量判断，下一版要读取生产状态、发布状态和计划发布时间。",
      next: "先检查今天应发布但未发布的计划。"
    },
    {
      target: "data",
      title: "昨日/今日数据回填",
      status: dataReturn ? "待核对" : "待回填",
      progress: dataReturn ? 40 : 10,
      evidence: `可读发布后数据记录 ${dataReturn} 条。`,
      blocker: "视频数据、达人精灵、商品点击需要绑定同一条周测计划。",
      next: "每天优先补前一日发布内容的数据。"
    },
    {
      target: "review",
      title: "今日复盘动作",
      status: reviews ? "待补结论" : "待建立",
      progress: reviews ? 25 : 10,
      evidence: `可读复盘记录 ${reviews} 条。`,
      blocker: "到观察期但没有结论时，本周无法判断放大、调整或停止。",
      next: "每天清一条到期复盘。"
    },
    {
      target: "libraries",
      title: "今日补库动作",
      status: libraryAssets ? "待补表现" : "待补库",
      progress: libraryAssets ? 30 : 10,
      evidence: `可读六库资产 ${libraryAssets} 条。`,
      blocker: "库资产缺使用记录时，无法判断本周沉淀是否有效。",
      next: "把当天拆解或复盘出的有效表达补进对应库。"
    }
  ];
}

function buildLiveDashboard(userAccessToken) {
  return Promise.all([getTableSnapshots(userAccessToken), getDailyReports(userAccessToken), getContentChains(userAccessToken)]).then(([resources, daily, chainData]) => {
    const snapshot = readSnapshot();
    const sanitizedResources = resources.map((resource) => ({
      name: safeText(resource.name),
      type: "table",
      count: Number(resource.count || 0),
      fields: resource.fields.map(safeText),
      url: resource.url
    }));

    const metrics = {
      ...snapshot.metrics,
      tables: sanitizedResources.length,
      viralSamples: countResources(sanitizedResources, SOURCE_TABLES),
      libraryAssets: countResources(sanitizedResources, LIBRARY_TABLES),
      workflowSteps: 9,
      weeklyPlans: countResources(sanitizedResources, PLAN_TABLES),
      pendingPublish: countResources(sanitizedResources, PLAN_TABLES),
      pendingReview: countResources(sanitizedResources, REVIEW_TABLES),
      weakOrBlocked: snapshot.metrics?.weakOrBlocked || 0,
      dataReturnRecords: countResources(sanitizedResources, DATA_TABLES)
    };
    const latestReports = latestDailyReports(daily.reports);
    const dailyProgress = latestReports.length ? buildProgressFromDaily(latestReports, "daily") : buildDailyProgress(sanitizedResources);
    const weeklyProgress = latestReports.length ? buildProgressFromDaily(latestReports, "weekly") : buildWeeklyProgress(sanitizedResources);
    const patchedMetrics = chainData.chains.length ? buildMetricsFromChains(metrics, chainData, latestReports) : (latestReports.length ? buildMetricsFromDaily(metrics, latestReports) : metrics);
    const todayActions = chainData.chains.length ? buildActionsFromChains(chainData) : (latestReports.length ? buildActionsFromDaily(latestReports) : buildTodayActions(sanitizedResources));
    const gaps = latestReports.length ? buildGapsFromDaily(latestReports, snapshot.gaps) : snapshot.gaps;

    const detailPages = {
      ...snapshot.detailPages,
      "module/source": patchDetail(snapshot.detailPages?.["module/source"], groupResources(sanitizedResources, SOURCE_TABLES), "实时数据口径：这里只读取外部爆款样本和拆解表，不包含发布后视频数据。"),
      "module/data": patchDetail(snapshot.detailPages?.["module/data"], groupResources(sanitizedResources, DATA_TABLES), "实时数据口径：这里专门读取发布后视频数据、达人精灵和商品点击数据。"),
      "module/review": patchDetail(snapshot.detailPages?.["module/review"], groupResources(sanitizedResources, [...REVIEW_TABLES, ...DATA_TABLES]), "复盘页使用数据回流结果做结论和六库反哺。")
    };

    return {
      ...snapshot,
      generatedAt: new Date().toISOString(),
      source: {
        name: "Tiktok内容工厂",
        mode: "feishu-live-readonly",
        note: "由 Vercel 后端以登录用户身份只读飞书，前端只接收脱敏统计。"
      },
      connection: {
        currentMode: "feishuLiveReadonly",
        nextMode: "readOnlyDrilldown",
        note: "已切到飞书登录后的后端只读模式；接口失败时前端会回退静态快照。"
      },
      metrics: patchedMetrics,
      resources: [daily.table, chainData.table, ...sanitizedResources].filter(Boolean),
      dailyReports: daily.reports,
      contentChains: chainData.chains,
      weeks: chainData.weeks,
      libraries: buildLibraries(snapshot, sanitizedResources),
      todayActions,
      dailyProgress,
      weeklyProgress,
      gaps,
      detailPages
    };
  });
}

function patchDetail(detail = {}, resources, task) {
  return {
    ...detail,
    task: detail.task || task,
    resources,
    currentStatus: resources.length ? "已连接实时入口" : "未读取到对应入口",
    liveNote: task
  };
}

function getDetailFromDashboard(dashboard, type, id) {
  const key = `${type}/${id}`;
  return dashboard.detailPages?.[key] || null;
}

module.exports = {
  buildLiveDashboard,
  getDetailFromDashboard
};
