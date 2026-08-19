const factoryModules = [
  {
    id: "source",
    label: "收集",
    icon: "S",
    color: "#2f68d8",
    title: "爆款与数据收集入口",
    status: "进行中",
    role: "把外部爆款、账号数据、达人精灵数据先收进来，作为所有拆解和选题的源头。",
    evidence: "TikTok 内容工厂作为当前主工作台：已有爆款视频脚本收集表、开头钩子收集、中间叙事逻辑收集，以及数据采集-英区/美区入口。",
    next: "先把爆款视频脚本收集表扩到一批可拆解样本，并给每条标类目、人群、目的、是否 AI、痛点、卖点和钩子。",
    links: ["爆款视频脚本收集表", "数据采集-英区", "数据采集-美区", "开头钩子收集", "中间叙事逻辑收集"],
    gap: "入口有了，但主表样本和拆解字段还不够满；旧青木数据如要继续用，需要迁移或映射到 TikTok 内容工厂。",
    priority: "高优先级"
  },
  {
    id: "deconstruct",
    label: "拆解",
    icon: "D",
    color: "#168463",
    title: "爆款拆解与表达入库",
    status: "需要补库",
    role: "把一个爆款视频拆成可复用零件：开头钩子、痛点、卖点、叙事逻辑、画面场景和音乐。",
    evidence: "TikTok 内容工厂里已存在开头钩子收集、中间叙事逻辑收集、爆款视频脚本收集表；当前开头钩子收集和中间叙事逻辑收集读到 0 条。",
    next: "以爆款视频脚本收集表为父记录，先拆出第一批钩子、痛点、卖点、叙事逻辑，避免库空转。",
    links: ["开头钩子收集", "中间叙事逻辑收集", "痛点库", "卖点库", "BGM库"],
    gap: "拆解表结构在，但没有形成可搜索、可筛选、可复用的有效库存。",
    priority: "高优先级"
  },
  {
    id: "libraries",
    label: "弹药",
    icon: "L",
    color: "#7550c8",
    title: "六库弹药系统",
    status: "需要补数据",
    role: "把灵感变成库存，让新人写脚本时从库里选答案，而不是从零想。",
    evidence: "飞书侧已有钩子库、卖点库、痛点库、选题库、卖点可视化库、高光帧库；Codex 已沉淀人群周测、钩子类型、卖点表达、场景库和 BGM 规则。",
    next: "把六库按生产顺序重排：人群/痛点 -> 钩子 -> 卖点 -> 场景/画面 -> 素材 -> BGM。",
    links: ["人群库", "痛点库", "钩子库", "卖点库", "场景库", "成品素材库", "BGM库"],
    gap: "库之间缺关联字段，尤其缺“这个钩子被哪些成品用过、数据怎么样”。",
    priority: "高优先级"
  },
  {
    id: "material",
    label: "素材",
    icon: "M",
    color: "#187b87",
    title: "素材与镜头资产底座",
    status: "部分可用",
    role: "把能拍、能剪、能复用的素材先筛出来，支撑脚本落地和镜头替换。",
    evidence: "TikTok 内容工厂侧已有素材收集库分组：音乐库收集文档、钩子库、卖点库、痛点库、选题库、卖点可视化库、高光帧库。",
    next: "先在 TikTok 内容工厂里统一素材入口和字段；旧镜头/素材底座如仍有价值，再做一次映射迁移。",
    links: ["素材收集库", "音乐库收集文档", "高光帧库", "卖点可视化库"],
    gap: "素材库方向已在 TikTok 内容工厂里成形，但镜头片段、成品素材和发布数据之间还缺统一关联。",
    priority: "中优先级"
  },
  {
    id: "script",
    label: "脚本",
    icon: "W",
    color: "#b57914",
    title: "选题与文案脚本生产",
    status: "进行中",
    role: "把人群、钩子、卖点、场景、素材组合成可拍脚本，并进入周测计划。",
    evidence: "Codex 已形成 OUNIN 单人群周测、US/UK 分开、5A 分层、产品卡 CTA 边界等脚本规则；飞书侧已有内容周测试计划表、文案脚本和内容复盘表入口。",
    next: "本周先选一个主测试人群，把脚本和素材绑定到发布时间、账号、T+1/T+3/T+7 数据字段。",
    links: ["内容周测试计划表", "文案脚本", "选题库", "自创文案"],
    gap: "脚本生产已经能做，但还需要和六库、素材库、发布数据形成一条记录链。",
    priority: "高优先级"
  },
  {
    id: "publish",
    label: "发布",
    icon: "P",
    color: "#5d6ad2",
    title: "发布排期与交付验收",
    status: "需要补证据",
    role: "把脚本、素材、账号、发布时间和交付文件统一绑定，避免只做到文件、不进入测试。",
    evidence: "Codex 已做过爆款/双语视频交付、字幕 QA、成片回写和私密来源阻塞标记；但当前总控台未直接接发布排期。",
    next: "在周测计划里明确每条脚本的发布账号、发布时间、素材来源、成片链接和复盘时间。",
    links: ["内容周测试计划表", "TK视频数据报告", "处理后视频", "成片"],
    gap: "缺一个从“已写脚本”到“已发布并待复盘”的清晰状态列。",
    priority: "中优先级"
  },
  {
    id: "review",
    label: "复盘",
    icon: "R",
    color: "#ba3f3f",
    title: "数据复盘与反哺六库",
    status: "待建立",
    role: "让 CTR/CVR/ROI 回到钩子、卖点、场景、人群和成品素材库，下一次选库更准。",
    evidence: "TikTok 内容工厂已有内容复盘表、内容周测试计划表和数据采集入口；当前重点是让发布后的数据回到这些表。",
    next: "把每条成品的表现拆回到人群、钩子、卖点、场景、BGM，建立“有效/淘汰/待复测”判断。",
    links: ["内容复盘表", "成品素材库", "TK视频数据报告", "达人精灵数据"],
    gap: "没有复盘回流，库会变成资料夹；有回流，库才会变成决策系统。",
    priority: "高优先级"
  },
  {
    id: "automation",
    label: "总控",
    icon: "A",
    color: "#4d6b7a",
    title: "Codex 自动化与提醒总控",
    status: "部分可用",
    role: "用 Codex 做体检、提醒、数据同步、BGM 处理、素材筛选和交付 QA，把重复动作流程化。",
    evidence: "已有 BGM 检索/下载/分析/写回流程、TikTok 数据同步经验、视频交付 QA、提醒与总控机制雏形。",
    next: "先不急着全自动，先让总控台能指出今天该补哪个表、哪条脚本该发、哪个素材该复盘。",
    links: ["BGM流程", "数据同步", "视频交付", "提醒机制"],
    gap: "自动化节点很多，但需要先统一状态口径：没有回读证据就不能显示完成。",
    priority: "中优先级"
  }
];

const libraries = [
  { title: "人群/痛点库", status: "需要补数据", count: "待建画像", color: "#2f68d8", use: "确定本周测谁" },
  { title: "钩子库", status: "需要补库", count: "开头表 0", color: "#168463", use: "决定前 3 秒" },
  { title: "卖点库", status: "需要补库", count: "表达待拆", color: "#7550c8", use: "决定中段说法" },
  { title: "场景/高光帧库", status: "部分可用", count: "场景审核 57", color: "#b57914", use: "决定画面" },
  { title: "素材/镜头库", status: "部分可用", count: "待迁移底座", color: "#187b87", use: "决定能不能拍剪" },
  { title: "BGM库", status: "部分可用", count: "23 tracks", color: "#4d6b7a", use: "决定剪辑情绪" }
];

const workflowSteps = [
  { title: "爆款收集", detail: "爆款视频、账号数据、达人精灵先进入口表。", asset: "收集入口" },
  { title: "结构拆解", detail: "拆钩子、痛点、卖点、叙事逻辑、场景、BGM。", asset: "拆解表" },
  { title: "沉淀入库", detail: "把拆出来的零件进入六库，标来源和使用条件。", asset: "六库" },
  { title: "选题定人群", detail: "每周先锁一个主测试人群和一个核心假设。", asset: "周测试计划" },
  { title: "组合脚本", detail: "从人群、钩子、卖点、场景里组合可拍脚本。", asset: "文案脚本" },
  { title: "匹配素材", detail: "反查镜头库和高光帧库，缺口进入拍摄清单。", asset: "素材库" },
  { title: "发布交付", detail: "绑定账号、发布时间、成片和数据回收节点。", asset: "发布记录" },
  { title: "复盘回流", detail: "把 CTR/CVR/ROI 反写回六库，保留有效打法。", asset: "复盘表" }
];

const todayActions = [
  {
    title: "先拆第一批爆款样本",
    detail: "从爆款视频脚本收集表开始，把父记录拆到钩子、痛点、卖点和叙事逻辑。"
  },
  {
    title: "把本周周测绑定到一个人群",
    detail: "先不要多变量，把人群、脚本、素材、账号、发布时间连成一条线。"
  },
  {
    title: "从素材库反查可拍镜头",
    detail: "已有 695+936+800 的素材底座，先用库选，不够再标拍摄缺口。"
  }
];

const gaps = [
  { title: "开头钩子收集", detail: "当前读到 0 条，先从爆款样本拆第一批，不然钩子库只是空壳。" },
  { title: "中间叙事逻辑收集", detail: "当前读到 0 条，需要把效果对比、证据链、使用场景等拆成可选模块。" },
  { title: "六库关联字段", detail: "缺少从成品回查钩子、卖点、场景、人群、BGM 的关联链。" },
  { title: "发布后复盘回流", detail: "有数据表和复盘表入口，但还需要固定 T+1/T+3/T+7 回填规则。" },
  { title: "BGM 来源不明项", detail: "Original Sound 一类没有作者、来源视频或音频样本时不能标完成。" }
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

const controlNav = document.querySelector("#controlNav");
const moduleGrid = document.querySelector("#moduleGrid");
const snapshotGrid = document.querySelector("#snapshotGrid");
const workflowStepsEl = document.querySelector("#workflowSteps");
const statusFilters = document.querySelector("#statusFilters");
const template = document.querySelector("#moduleCardTemplate");

function renderMetrics() {
  document.querySelector("#tableAssetCount").textContent = "12";
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
      render();
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
      currentFilter = "全部";
      render();
      document.querySelector(`[data-module-id="${nav.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    controlNav.appendChild(button);
  });
}

function renderWorkflow() {
  workflowStepsEl.innerHTML = "";
  workflowSteps.forEach((step, index) => {
    const item = document.createElement("article");
    item.className = "workflow-step";
    item.innerHTML = `
      <b>${index + 1}</b>
      <div>
        <h4>${step.title}</h4>
        <p>${step.detail}</p>
        <span>${step.asset}</span>
      </div>
    `;
    workflowStepsEl.appendChild(item);
  });
}

function renderSnapshot() {
  snapshotGrid.innerHTML = "";
  libraries.forEach((item) => {
    const card = document.createElement("article");
    card.className = "snapshot-card";
    card.innerHTML = `
      <div class="snapshot-icon" style="background:${item.color}">${item.title.slice(0, 1)}</div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.use} / ${item.count}</p>
      </div>
      <span class="${statusMeta[item.status].className}">${item.status}</span>
    `;
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
    priority.innerHTML = `<span class="priority-chip">${item.priority}</span>`;
    node.appendChild(priority);

    moduleGrid.appendChild(node);
  });
}

function renderTodayActions() {
  const list = document.querySelector("#todayActions");
  list.innerHTML = "";
  todayActions.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${index + 1}</b><p>${item.title}<span>${item.detail}</span></p>`;
    list.appendChild(li);
  });
}

function renderGaps() {
  const list = document.querySelector("#gapList");
  list.innerHTML = "";
  gaps.forEach((item) => {
    const div = document.createElement("div");
    div.className = "decision-item";
    div.innerHTML = `<strong>${item.title}</strong><p>${item.detail}</p>`;
    list.appendChild(div);
  });
}

function render() {
  renderMetrics();
  renderFilters();
  renderNav();
  renderWorkflow();
  renderSnapshot();
  renderCards();
  renderTodayActions();
  renderGaps();
}

document.querySelector("#focusGaps").addEventListener("click", () => {
  currentFilter = "阻塞";
  render();
});

document.querySelector("#showAll").addEventListener("click", () => {
  currentFilter = "全部";
  render();
});

render();
