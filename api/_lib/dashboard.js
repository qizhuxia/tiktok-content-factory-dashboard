const fs = require("fs");
const path = require("path");
const { buildTableUrl, findTableByName, getTableSnapshots, listTableRecords } = require("./feishu");

const SOURCE_TABLES = ["爆款视频脚本收集表", "开头钩子收集", "中间叙事逻辑收集"];
const DATA_TABLES = ["视频数据-英区", "视频数据-美区", "达人精灵数据下载-英区", "达人精灵数据下载-美区", "商品点击数据-英区", "商品点击数据-美区"];
const LIBRARY_TABLES = ["钩子库", "卖点库", "痛点库", "选题库", "卖点可视化库", "高光帧库"];
const PLAN_TABLES = ["内容周测试计划表"];
const REVIEW_TABLES = ["内容周复盘表"];
const DAILY_TABLE = "内容生产环节日报";
const DAILY_FIELDS = ["日报标题", "日期", "所属周", "环节", "今日新增数", "今日完成数", "本周累计数", "数据来源表", "统计口径", "卡点", "证据入口"];
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
  return Promise.all([getTableSnapshots(userAccessToken), getDailyReports(userAccessToken)]).then(([resources, daily]) => {
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
    const patchedMetrics = latestReports.length ? buildMetricsFromDaily(metrics, latestReports) : metrics;
    const todayActions = latestReports.length ? buildActionsFromDaily(latestReports) : buildTodayActions(sanitizedResources);
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
      resources: daily.table ? [...sanitizedResources, daily.table] : sanitizedResources,
      dailyReports: daily.reports,
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
