const fs = require("fs");
const path = require("path");
const { getTableSnapshots } = require("./feishu");

const SOURCE_TABLES = ["爆款视频脚本收集表", "开头钩子收集", "中间叙事逻辑收集"];
const DATA_TABLES = ["视频数据-英区", "视频数据-美区", "达人精灵数据下载-英区", "达人精灵数据下载-美区", "商品点击数据-英区", "商品点击数据-美区"];
const LIBRARY_TABLES = ["钩子库", "卖点库", "痛点库", "选题库", "卖点可视化库", "高光帧库"];
const PLAN_TABLES = ["内容周测试计划表"];
const REVIEW_TABLES = ["内容周复盘表"];

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
  return getTableSnapshots(userAccessToken).then((resources) => {
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
      metrics,
      resources: sanitizedResources,
      libraries: buildLibraries(snapshot, sanitizedResources),
      todayActions: buildTodayActions(sanitizedResources),
      dailyProgress: buildDailyProgress(sanitizedResources),
      weeklyProgress: buildWeeklyProgress(sanitizedResources),
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
