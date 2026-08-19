const factoryModules = [
  {
    id: "source",
    type: "module",
    label: "收集",
    icon: "S",
    color: "#2f68d8",
    title: "爆款与数据收集入口",
    status: "进行中",
    role: "把外部爆款、账号数据、达人精灵数据先收进来，作为所有拆解和选题的源头。",
    evidence: "Tiktok内容工厂已形成英区/美区数据采集、爆款视频脚本收集、开头钩子收集和中间叙事逻辑收集入口。",
    next: "把新增爆款样本持续补齐类目、人群、目的、是否 AI、痛点、卖点、钩子和叙事逻辑。",
    links: ["爆款视频脚本收集表", "数据采集-英区", "数据采集-美区", "开头钩子收集", "中间叙事逻辑收集"],
    fields: ["视频链接", "内容载体", "脚本类型", "视频目的", "痛点", "卖点", "钩子", "叙事逻辑", "处理后视频"],
    usage: ["先把公开视频或账号数据进入入口表。", "每条爆款必须能回到来源，不手写来历不明的结论。", "拆解前先判断它适合做钩子、叙事、卖点还是选题样本。"],
    gap: "入口有量，但需要继续把主表和拆解表做成稳定父子关系。",
    priority: "高优先级"
  },
  {
    id: "deconstruct",
    type: "module",
    label: "拆解",
    icon: "D",
    color: "#168463",
    title: "爆款拆解与表达入库",
    status: "进行中",
    role: "把一个爆款视频拆成可复用零件：开头钩子、痛点、卖点、叙事逻辑、画面场景和音乐。",
    evidence: "开头钩子收集和中间叙事逻辑收集已能关联爆款主表，抽样记录里已有切片、原文、翻译、类型和分析。",
    next: "每条爆款至少拆出一个钩子和一个中段叙事；能复刻的再进入周测试计划。",
    links: ["爆款视频脚本收集表", "开头钩子收集", "中间叙事逻辑收集"],
    fields: ["关联爆款视频", "钩子类型", "钩子描述分析", "视频画面分析", "视频切片", "中间叙事类型", "产品引入/效果展示方式"],
    usage: ["先拆前 3 秒，看停留靠什么成立。", "再拆中段，看产品如何进入、证据如何推进。", "只把有来源的视频片段和文字沉淀为可复用模板。"],
    gap: "拆解结果还没有完全反哺到六库，也没有直接标明被哪条周测使用过。",
    priority: "高优先级"
  },
  {
    id: "libraries",
    type: "module",
    label: "弹药",
    icon: "L",
    color: "#7550c8",
    title: "六库弹药系统",
    status: "需要补数据",
    role: "把灵感变成库存，让新人写脚本时从库里选答案，而不是从零想。",
    evidence: "钩子库、卖点库、痛点库已有可用内容；选题库、卖点可视化库、高光帧库仍偏轻。",
    next: "优先补关联字段和使用记录，让库资产能被周测、脚本和复盘证明有效。",
    links: ["人群/痛点库", "钩子库", "卖点库", "场景/高光帧库", "素材/镜头库", "BGM库"],
    fields: ["分类", "原文/表达", "翻译", "适用型号", "优先级", "可拍画面", "使用记录", "数据反馈"],
    usage: ["写脚本前先定人群/痛点。", "再从钩子库选前 3 秒表达。", "中段用卖点库和场景/画面库补证据。"],
    gap: "库有内容，但缺少从成品数据回查库资产表现的闭环。",
    priority: "高优先级"
  },
  {
    id: "material",
    type: "module",
    label: "素材",
    icon: "M",
    color: "#187b87",
    title: "素材与镜头资产底座",
    status: "部分可用",
    role: "把能拍、能剪、能复用的素材先筛出来，支撑脚本落地和镜头替换。",
    evidence: "Tiktok内容工厂里已有素材收集库分组，包含音乐、钩子、卖点、痛点、选题、卖点可视化和高光帧。",
    next: "先把可拍画面和高光帧绑定到脚本步骤；旧素材底座如继续使用，再做迁移映射。",
    links: ["素材收集库", "高光帧库", "卖点可视化库", "音乐库收集文档"],
    fields: ["素材类型", "画面用途", "对应卖点", "对应痛点", "适用脚本段落", "是否可直接使用"],
    usage: ["脚本写到画面时先查素材库。", "能用的镜头直接绑定到脚本段落。", "缺的镜头写进拍摄缺口，不临时硬凑。"],
    gap: "素材、镜头、成品表现之间还缺统一关联。",
    priority: "中优先级"
  },
  {
    id: "script",
    type: "module",
    label: "脚本",
    icon: "W",
    color: "#b57914",
    title: "选题与文案脚本生产",
    status: "进行中",
    role: "把人群、钩子、卖点、场景、素材组合成可拍脚本，并进入周测计划。",
    evidence: "内容周测试计划表已有测试产品、站点、计划脚本数、生产状态、观察状态和关联爆款等字段。",
    next: "每条脚本都绑定一个周测计划、一个核心测试变量和一个可复盘的数据口径。",
    links: ["内容周测试计划表", "文案脚本文档", "选题库"],
    fields: ["测试计划", "测试目的", "核心测试变量", "测试产品", "测试站点", "计划脚本数量", "生产状态", "观察状态"],
    usage: ["一条计划只测一个核心假设。", "脚本必须说明它在测钩子、选题、脚本结构、场景还是卖点。", "写完后进入发布排期，而不是停在文档里。"],
    gap: "计划到发布的数据链还不够稳，部分计划仍停在待发布。",
    priority: "高优先级"
  },
  {
    id: "publish",
    type: "module",
    label: "发布",
    icon: "P",
    color: "#5d6ad2",
    title: "发布排期与交付验收",
    status: "需要补证据",
    role: "把脚本、素材、账号、发布时间和交付文件统一绑定，避免只做到文件、不进入测试。",
    evidence: "周测试计划已有发布账号、计划发布视频数、已发布视频数、关联英/美视频数据字段。",
    next: "把每条已发布内容回填到对应视频数据表，形成可观察状态。",
    links: ["内容周测试计划表", "视频数据-英区", "视频数据-美区", "商品点击数据-英区/美区"],
    fields: ["发布账号", "计划发布视频数", "已发布视频数", "关联视频数据", "生产状态", "观察状态"],
    usage: ["发布前确认脚本、素材、账号和时间。", "发布后回填视频数据关联。", "达到观察周期后进入复盘。"],
    gap: "需要补清楚从脚本到发布记录的状态，不然总控台无法判断哪条内容卡住。",
    priority: "中优先级"
  },
  {
    id: "review",
    type: "module",
    label: "复盘",
    icon: "R",
    color: "#ba3f3f",
    title: "数据复盘与反哺六库",
    status: "待建立",
    role: "让 CTR/CVR/ROI 回到钩子、卖点、场景、人群和成品素材库，下一次选库更准。",
    evidence: "内容周复盘表已有本周测试计划、复盘结论、做得好/不好、下周优化动作等字段，但抽样显示复盘内容仍偏空。",
    next: "先从发布后数据回填做起，把 3s/5s、完播、点击率和 GMV 对应回周测结论。",
    links: ["内容周复盘表", "视频数据表", "商品点击数据表", "六库"],
    fields: ["本周测试计划", "复盘状态", "本周复盘结论", "做得好的地方", "做得不好的地方", "下周优化动作"],
    usage: ["先看前 3 秒和 5 秒判断钩子。", "再看完播和平均观看判断脚本结构。", "最后看点击和 GMV 判断卖点/CTA。"],
    gap: "复盘表有结构，但结论和回流动作需要补齐。",
    priority: "高优先级"
  },
  {
    id: "automation",
    type: "module",
    label: "总控",
    icon: "A",
    color: "#4d6b7a",
    title: "Codex 自动化与提醒总控",
    status: "部分可用",
    role: "用 Codex 做体检、提醒、数据同步、BGM 处理、素材筛选和交付 QA，把重复动作流程化。",
    evidence: "已有只读诊断、BGM 处理、数据同步、视频交付 QA 和 GitHub Pages 部署经验。",
    next: "在网页详情稳定后，再设计自动快照或后端读取，不直接把密钥放进前端。",
    links: ["只读诊断", "静态快照", "GitHub Pages", "后续权限方案"],
    fields: ["数据源", "更新时间", "状态口径", "证据", "阻塞项", "下一步动作"],
    usage: ["先只读诊断，不写外部系统。", "确认字段和状态口径后再自动化。", "没有回读证据的事项不能显示完成。"],
    gap: "公开网页不能直接安全读取飞书实时数据，需要后端或快照方案。",
    priority: "中优先级"
  }
];

const libraries = [
  {
    id: "audience-pain",
    type: "library",
    title: "人群/痛点库",
    status: "需要补数据",
    count: "31 条痛点",
    color: "#2f68d8",
    use: "确定本周测谁",
    tables: ["痛点库", "内容周测试计划表"],
    fields: ["痛点分类", "痛点标题", "用户场景", "具体表现", "情绪与后果", "可拍画面", "优先级"],
    usage: ["拿到产品后先选人群和痛点。", "优先选择 P1 痛点。", "把痛点写进周测计划，避免脚本泛泛讲功能。"],
    gap: "痛点库已有内容，但人群画像字段还不完整。"
  },
  {
    id: "hook",
    type: "library",
    title: "钩子库",
    status: "需要补库",
    count: "600 条表达",
    color: "#168463",
    use: "决定前 3 秒",
    tables: ["钩子库", "开头钩子收集"],
    fields: ["钩子类型", "原文", "翻译", "关联爆款视频", "钩子描述分析", "视频切片"],
    usage: ["先从通用钩子库找表达模板。", "再从开头钩子收集找有视频证据的拆解样本。", "用发布数据反推哪类钩子有效。"],
    gap: "通用钩子库和爆款钩子拆解表还需要统一使用次数和数据表现。"
  },
  {
    id: "selling",
    type: "library",
    title: "卖点库",
    status: "需要补库",
    count: "44 条卖点",
    color: "#7550c8",
    use: "决定中段说法",
    tables: ["卖点库", "卖点可视化库"],
    fields: ["一级卖点", "二级卖点", "卖点标题", "产品事实", "用户收益", "证明方式与可拍画面", "适用型号"],
    usage: ["先选一个产品事实。", "把事实翻译成用户收益。", "再选择可拍画面证明卖点。"],
    gap: "卖点表达已有，但缺与视频数据、脚本和可视化素材的强关联。"
  },
  {
    id: "scene",
    type: "library",
    title: "场景/高光帧库",
    status: "部分可用",
    count: "高光帧 5 条",
    color: "#b57914",
    use: "决定画面",
    tables: ["高光帧库", "卖点可视化库", "爆款视频脚本收集表"],
    fields: ["文本", "附件", "场景作用", "画面证明", "可拍画面"],
    usage: ["写脚本画面时先查高光帧。", "没有合适画面就回到拍摄缺口。", "场景要服务钩子或卖点，不做装饰。"],
    gap: "高光帧库字段仍薄，需要补场景类型、适用卖点和使用记录。"
  },
  {
    id: "material",
    type: "library",
    title: "素材/镜头库",
    status: "部分可用",
    count: "待迁移底座",
    color: "#187b87",
    use: "决定能不能拍剪",
    tables: ["素材收集库", "高光帧库", "文案脚本文档"],
    fields: ["素材用途", "对应脚本段落", "对应卖点", "可直接使用", "待补镜头"],
    usage: ["脚本写完后逐段找素材。", "找不到的镜头进入拍摄清单。", "拍完或剪完后再回填素材状态。"],
    gap: "旧素材底座需要迁移映射到 Tiktok内容工厂，当前公开页只保留待迁移口径。"
  },
  {
    id: "bgm",
    type: "library",
    title: "BGM库",
    status: "部分可用",
    count: "声音资产",
    color: "#4d6b7a",
    use: "决定剪辑情绪",
    tables: ["音乐库收集文档"],
    fields: ["曲名", "来源", "节奏", "情绪", "适合画面", "适合段落", "不可用场景", "使用记录"],
    usage: ["按画面情绪和剪辑段落选音乐。", "来源不清的 Original Sound 保持待确认。", "不要把技术分析当成人工听审结论。"],
    gap: "当前仍是文档型资产，后续可视需要再转为结构化表。"
  }
];

const workflowSteps = [
  { id: "source", type: "workflow", title: "爆款收集", detail: "爆款视频、账号数据、达人精灵先进入口表。", asset: "收集入口", tables: ["爆款视频脚本收集表", "数据采集-英区/美区"], fields: ["视频链接", "类目", "内容载体", "视频目的"], usage: ["先存来源。", "再判断是否值得拆。", "最后进入拆解表。"], gap: "新增样本需要稳定补齐核心字段。" },
  { id: "deconstruct", type: "workflow", title: "结构拆解", detail: "拆钩子、痛点、卖点、叙事逻辑、场景、BGM。", asset: "拆解表", tables: ["开头钩子收集", "中间叙事逻辑收集"], fields: ["关联爆款", "类型", "描述", "切片"], usage: ["前 3 秒先拆钩子。", "中段拆产品怎么进入。", "能复用才入库。"], gap: "需要把拆解结果回流到六库。" },
  { id: "library", type: "workflow", title: "沉淀入库", detail: "把拆出来的零件进入六库，标来源和使用条件。", asset: "六库", tables: ["钩子库", "卖点库", "痛点库", "高光帧库"], fields: ["分类", "表达", "来源", "适用条件"], usage: ["只收可复用表达。", "保留来源。", "标清适用人群或场景。"], gap: "缺使用次数和表现数据。" },
  { id: "plan", type: "workflow", title: "选题定人群", detail: "每周先锁一个主测试人群和一个核心假设。", asset: "周测试计划", tables: ["内容周测试计划表"], fields: ["测试计划", "测试目的", "核心测试变量"], usage: ["一条记录一个假设。", "先定人群。", "再选核心变量。"], gap: "计划到发布仍需更强状态管理。" },
  { id: "script", type: "workflow", title: "组合脚本", detail: "从人群、钩子、卖点、场景里组合可拍脚本。", asset: "文案脚本", tables: ["文案脚本文档", "内容周测试计划表"], fields: ["脚本", "素材", "发布账号"], usage: ["先套钩子。", "中段用卖点和证据。", "结尾放 CTA 或下一步。"], gap: "脚本和六库资产之间需要更明确的绑定。" },
  { id: "material", type: "workflow", title: "匹配素材", detail: "反查镜头库和高光帧库，缺口进入拍摄清单。", asset: "素材库", tables: ["高光帧库", "卖点可视化库"], fields: ["画面", "附件", "适用段落"], usage: ["先查现有素材。", "再列拍摄缺口。", "最后交给拍摄/剪辑。"], gap: "素材库还需要和脚本段落连接。" },
  { id: "publish", type: "workflow", title: "发布交付", detail: "绑定账号、发布时间、成片和数据回收节点。", asset: "发布记录", tables: ["内容周测试计划表", "视频数据表"], fields: ["发布账号", "已发布视频数", "关联视频数据"], usage: ["发布前确认账号。", "发布后回填视频数据。", "观察期后进入复盘。"], gap: "发布状态需要更细。" },
  { id: "review", type: "workflow", title: "复盘回流", detail: "把 CTR/CVR/ROI 反写回六库，保留有效打法。", asset: "复盘表", tables: ["内容周复盘表", "商品点击数据表"], fields: ["复盘结论", "做得好", "做得不好", "下周动作"], usage: ["先看留存。", "再看点击。", "最后决定放大、调整或停止。"], gap: "复盘结论和六库反哺仍需补齐。" }
];

const todayActions = [
  { title: "先拆第一批爆款样本", detail: "从爆款视频脚本收集表开始，把父记录拆到钩子、痛点、卖点和叙事逻辑。" },
  { title: "把本周周测绑定到一个人群", detail: "先不要多变量，把人群、脚本、素材、账号、发布时间连成一条线。" },
  { title: "从素材库反查可拍镜头", detail: "先用库选，不够再标拍摄缺口。" }
];

const gaps = [
  { title: "六库关联字段", detail: "缺少从成品回查钩子、卖点、场景、人群、BGM 的关联链。" },
  { title: "发布后复盘回流", detail: "需要固定 T+1/T+3/T+7 或同等观察周期的回填规则。" },
  { title: "选题/可视化/高光帧库", detail: "字段还薄，暂时更像草稿库。" },
  { title: "BGM 来源不明项", detail: "Original Sound 一类没有作者、来源视频或音频样本时不能标完成。" },
  { title: "公开网页实时数据", detail: "GitHub Pages 不能安全直连飞书，需要后端或静态快照。" }
];

const navItems = [
  { id: "source", label: "爆款收集", icon: "S" },
  { id: "deconstruct", label: "拆解入库", icon: "D" },
  { id: "libraries", label: "六库弹药", icon: "L" },
  { id: "material", label: "素材底座", icon: "M" },
  { id: "script", label: "脚本生产", icon: "W" },
  { id: "publish", label: "发布交付", icon: "P" },
  { id: "review", label: "复盘回流", icon: "R" },
  { id: "automation", label: "总控自动化", icon: "A" }
];

const statusMeta = {
  "进行中": { className: "status-active", dot: "#2f68d8" },
  "需要补库": { className: "status-gap", dot: "#b57914" },
  "需要补数据": { className: "status-data", dot: "#b57914" },
  "部分可用": { className: "status-partial", dot: "#168463" },
  "需要补证据": { className: "status-blocked", dot: "#ba3f3f" },
  "待建立": { className: "status-todo", dot: "#687586" }
};

const filters = ["全部", "进行中", "部分可用", "需要补库", "需要补数据", "待建立"];
let currentFilter = "全部";

const overviewView = document.querySelector("#overviewView");
const detailView = document.querySelector("#detailView");
const controlNav = document.querySelector("#controlNav");
const moduleGrid = document.querySelector("#moduleGrid");
const snapshotGrid = document.querySelector("#snapshotGrid");
const workflowStepsEl = document.querySelector("#workflowSteps");
const statusFilters = document.querySelector("#statusFilters");
const template = document.querySelector("#moduleCardTemplate");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listMarkup(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function findDetail(type, id) {
  if (type === "module") return factoryModules.find((item) => item.id === id);
  if (type === "library") return libraries.find((item) => item.id === id);
  if (type === "workflow") return workflowSteps.find((item) => item.id === id);
  return null;
}

function getDetailSummary(type, item) {
  if (type === "module") return item.role;
  if (type === "library") return `这个库用于${item.use}，当前状态是${item.status}。`;
  return item.detail;
}

function renderMetrics() {
  document.querySelector("#tableAssetCount").textContent = "22";
  document.querySelector("#materialCount").textContent = "待映射";
  document.querySelector("#stepCount").textContent = workflowSteps.length;
  document.querySelector("#gapCount").textContent = gaps.length;
}

function renderFilters() {
  statusFilters.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `segment${filter === currentFilter ? " active" : ""}`;
    button.textContent = filter;
    button.addEventListener("click", () => {
      currentFilter = filter;
      renderOverview();
    });
    statusFilters.appendChild(button);
  });
}

function renderNav() {
  controlNav.innerHTML = "";
  navItems.forEach((nav) => {
    const module = factoryModules.find((item) => item.id === nav.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-item";
    button.innerHTML = `
      <span class="nav-icon" aria-hidden="true">${nav.icon}</span>
      <span>${nav.label}</span>
      <span class="nav-status" style="background:${statusMeta[module.status].dot}"></span>
    `;
    button.addEventListener("click", () => {
      window.location.hash = `module/${nav.id}`;
    });
    controlNav.appendChild(button);
  });
}

function renderWorkflow() {
  workflowStepsEl.innerHTML = "";
  workflowSteps.forEach((step, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "workflow-step clickable-card";
    item.innerHTML = `
      <b>${index + 1}</b>
      <div>
        <h4>${escapeHtml(step.title)}</h4>
        <p>${escapeHtml(step.detail)}</p>
        <span>${escapeHtml(step.asset)}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      window.location.hash = `workflow/${step.id}`;
    });
    workflowStepsEl.appendChild(item);
  });
}

function renderSnapshot() {
  snapshotGrid.innerHTML = "";
  libraries.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "snapshot-card clickable-card";
    card.innerHTML = `
      <div class="snapshot-icon" style="background:${item.color}">${escapeHtml(item.title.slice(0, 1))}</div>
      <div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.use)} / ${escapeHtml(item.count)}</p>
      </div>
      <span class="${statusMeta[item.status].className}">${escapeHtml(item.status)}</span>
    `;
    card.addEventListener("click", () => {
      window.location.hash = `library/${item.id}`;
    });
    snapshotGrid.appendChild(card);
  });
}

function renderCards() {
  const visible = currentFilter === "阻塞"
    ? factoryModules.filter((item) => ["需要补库", "需要补数据", "需要补证据", "待建立"].includes(item.status))
    : currentFilter === "全部"
      ? factoryModules
      : factoryModules.filter((item) => item.status === currentFilter);

  moduleGrid.innerHTML = "";

  visible.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add("clickable-card");
    node.tabIndex = 0;
    node.role = "button";
    node.dataset.moduleId = item.id;
    node.querySelector(".module-icon").textContent = item.icon;
    node.querySelector(".module-icon").style.background = item.color;
    node.querySelector(".module-label").textContent = item.label;
    node.querySelector("h4").textContent = item.title;

    const statusPill = node.querySelector(".status-pill");
    statusPill.textContent = item.status;
    statusPill.classList.add(statusMeta[item.status].className);

    node.querySelector(".role").textContent = item.role;
    node.querySelector(".evidence").textContent = item.evidence;
    node.querySelector(".next").textContent = item.next;
    node.querySelector(".links").textContent = item.links.join("、");
    node.querySelector(".gap").textContent = item.gap;

    const priority = document.createElement("div");
    priority.className = "card-footer";
    priority.innerHTML = `<span class="priority-chip">${escapeHtml(item.priority)}</span><span class="open-hint">查看 SOP</span>`;
    node.appendChild(priority);

    node.addEventListener("click", () => {
      window.location.hash = `module/${item.id}`;
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.hash = `module/${item.id}`;
      }
    });

    moduleGrid.appendChild(node);
  });
}

function renderTodayActions() {
  const list = document.querySelector("#todayActions");
  list.innerHTML = "";
  todayActions.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${index + 1}</b><p>${escapeHtml(item.title)}<span>${escapeHtml(item.detail)}</span></p>`;
    list.appendChild(li);
  });
}

function renderGaps() {
  const list = document.querySelector("#gapList");
  list.innerHTML = "";
  gaps.forEach((item) => {
    const div = document.createElement("div");
    div.className = "decision-item";
    div.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p>`;
    list.appendChild(div);
  });
}

function renderOverview() {
  renderMetrics();
  renderFilters();
  renderNav();
  renderWorkflow();
  renderSnapshot();
  renderCards();
  renderTodayActions();
  renderGaps();
}

function renderDetail(type, id) {
  const item = findDetail(type, id);
  if (!item) {
    window.location.hash = "";
    return;
  }

  const status = item.status || "流程步骤";
  const tables = item.links || item.tables || [];
  const fields = item.fields || [];
  const usage = item.usage || [];
  const gap = item.gap || "暂无明确缺口。";
  const next = item.next || "按当前步骤执行后，把结果回到对应表或库。";

  overviewView.hidden = true;
  detailView.hidden = false;
  detailView.innerHTML = `
    <div class="detail-shell">
      <div class="detail-toolbar">
        <button class="icon-button back-button" type="button" id="backToOverview">
          <span aria-hidden="true">←</span>
          <span>总览</span>
        </button>
        <span class="detail-route">${escapeHtml(type)} / ${escapeHtml(id)}</span>
      </div>

      <header class="detail-hero">
        <div class="detail-icon" style="background:${item.color || "#2f68d8"}">${escapeHtml(item.icon || item.title.slice(0, 1))}</div>
        <div>
          <p class="eyebrow">${type === "module" ? "Command SOP" : type === "library" ? "Library SOP" : "Workflow SOP"}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(getDetailSummary(type, item))}</p>
        </div>
        <span class="status-pill ${statusMeta[status]?.className || "status-todo"}">${escapeHtml(status)}</span>
      </header>

      <section class="detail-grid">
        <article class="detail-card wide">
          <span>对应 TikTok 内容工厂表/文档</span>
          ${listMarkup(tables)}
        </article>
        <article class="detail-card">
          <span>核心字段</span>
          ${listMarkup(fields)}
        </article>
        <article class="detail-card">
          <span>新人怎么操作</span>
          ${listMarkup(usage)}
        </article>
        <article class="detail-card warning">
          <span>主要缺口</span>
          <p>${escapeHtml(gap)}</p>
        </article>
        <article class="detail-card next">
          <span>下一步动作</span>
          <p>${escapeHtml(next)}</p>
        </article>
      </section>
    </div>
  `;

  document.querySelector("#backToOverview").addEventListener("click", () => {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    routeFromHash();
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function routeFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  const [type, id] = hash.split("/");
  if (!type || !id) {
    overviewView.hidden = false;
    detailView.hidden = true;
    renderOverview();
    return;
  }
  renderOverview();
  renderDetail(type, id);
}

document.querySelector("#focusGaps").addEventListener("click", () => {
  history.pushState("", document.title, window.location.pathname + window.location.search);
  overviewView.hidden = false;
  detailView.hidden = true;
  currentFilter = "阻塞";
  renderOverview();
});

document.querySelector("#showAll").addEventListener("click", () => {
  history.pushState("", document.title, window.location.pathname + window.location.search);
  overviewView.hidden = false;
  detailView.hidden = true;
  currentFilter = "全部";
  renderOverview();
});

window.addEventListener("hashchange", routeFromHash);
routeFromHash();
