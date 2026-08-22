const factoryModules = [
  {
    id: "source",
    type: "module",
    label: "收集",
    icon: "S",
    color: "#2f68d8",
    title: "爆款样本收集入口",
    status: "进行中",
    role: "把外部可参考、可拆解、可复刻的爆款样本先收进来，作为钩子、叙事、卖点和选题拆解的源头。",
    evidence: "Tiktok内容工厂已形成爆款视频脚本收集、开头钩子收集和中间叙事逻辑收集入口。",
    next: "把新增爆款样本持续补齐类目、人群、目的、是否 AI、痛点、卖点、钩子和叙事逻辑。",
    links: ["爆款视频脚本收集表", "开头钩子收集", "中间叙事逻辑收集"],
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
    role: "把灵感变成库存，让脚本、素材、发布和复盘都能从库里拿可复用依据。",
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
    id: "data",
    type: "module",
    label: "数据",
    icon: "G",
    color: "#187b87",
    title: "视频发布后数据回流",
    status: "进行中",
    role: "把已发布视频的播放、留存、点击和商品表现回收到内容工厂，作为复盘和六库有效性判断的依据。",
    evidence: "Tiktok内容工厂已拆出视频数据-英区/美区、达人精灵数据下载-英区/美区、商品点击数据-英区/美区。",
    next: "发布后先回填视频数据，再把商品点击数据和周测计划关联起来，达到观察期后进入复盘。",
    links: ["视频数据-英区", "视频数据-美区", "达人精灵数据下载-英区", "达人精灵数据下载-美区", "商品点击数据-英区", "商品点击数据-美区"],
    fields: ["视频链接/ID", "发布时间", "站点", "播放", "3秒/5秒留存", "完播", "点击", "GMV", "关联周测计划"],
    usage: ["视频发布后进入对应站点的视频数据表。", "同步达人精灵和商品点击数据。", "把数据关联回周测计划，等待复盘。"],
    gap: "视频数据回流和周测计划之间还需要更稳定的关联字段与回填节奏。",
    priority: "高优先级"
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
  { id: "source", type: "workflow", title: "爆款收集", detail: "外部可参考爆款先进入样本表，不混入发布后数据。", asset: "爆款样本", tables: ["爆款视频脚本收集表"], fields: ["视频链接", "类目", "内容载体", "视频目的"], usage: ["先存来源。", "再判断是否值得拆。", "最后进入拆解表。"], gap: "新增样本需要稳定补齐核心字段。" },
  { id: "deconstruct", type: "workflow", title: "结构拆解", detail: "拆钩子、痛点、卖点、叙事逻辑、场景、BGM。", asset: "拆解表", tables: ["开头钩子收集", "中间叙事逻辑收集"], fields: ["关联爆款", "类型", "描述", "切片"], usage: ["前 3 秒先拆钩子。", "中段拆产品怎么进入。", "能复用才入库。"], gap: "需要把拆解结果回流到六库。" },
  { id: "library", type: "workflow", title: "沉淀入库", detail: "把拆出来的零件进入六库，标来源和使用条件。", asset: "六库", tables: ["钩子库", "卖点库", "痛点库", "高光帧库"], fields: ["分类", "表达", "来源", "适用条件"], usage: ["只收可复用表达。", "保留来源。", "标清适用人群或场景。"], gap: "缺使用次数和表现数据。" },
  { id: "plan", type: "workflow", title: "选题定人群", detail: "每周先锁一个主测试人群和一个核心假设。", asset: "周测试计划", tables: ["内容周测试计划表"], fields: ["测试计划", "测试目的", "核心测试变量"], usage: ["一条记录一个假设。", "先定人群。", "再选核心变量。"], gap: "计划到发布仍需更强状态管理。" },
  { id: "script", type: "workflow", title: "组合脚本", detail: "从人群、钩子、卖点、场景里组合可拍脚本。", asset: "文案脚本", tables: ["文案脚本文档", "内容周测试计划表"], fields: ["脚本", "素材", "发布账号"], usage: ["先套钩子。", "中段用卖点和证据。", "结尾放 CTA 或下一步。"], gap: "脚本和六库资产之间需要更明确的绑定。" },
  { id: "material", type: "workflow", title: "匹配素材", detail: "反查镜头库和高光帧库，缺口进入拍摄清单。", asset: "素材库", tables: ["高光帧库", "卖点可视化库"], fields: ["画面", "附件", "适用段落"], usage: ["先查现有素材。", "再列拍摄缺口。", "最后交给拍摄/剪辑。"], gap: "素材库还需要和脚本段落连接。" },
  { id: "publish", type: "workflow", title: "发布交付", detail: "绑定账号、发布时间、成片和数据回收节点。", asset: "发布记录", tables: ["内容周测试计划表"], fields: ["发布账号", "已发布视频数", "生产状态"], usage: ["发布前确认账号。", "发布后标记已发布。", "把视频交给数据回流步骤。"], gap: "发布状态需要更细。" },
  { id: "data", type: "workflow", title: "数据回流", detail: "发布后回收视频表现、达人精灵和商品点击数据。", asset: "数据表", tables: ["视频数据-英区/美区", "商品点击数据-英区/美区"], fields: ["视频ID", "播放", "留存", "点击", "关联周测计划"], usage: ["先同步视频数据。", "再补商品点击。", "最后关联回周测计划。"], gap: "数据表和周测计划关联还要补稳。" },
  { id: "review", type: "workflow", title: "复盘回流", detail: "把 CTR/CVR/ROI 反写回六库，保留有效打法。", asset: "复盘表", tables: ["内容周复盘表", "商品点击数据表"], fields: ["复盘结论", "做得好", "做得不好", "下周动作"], usage: ["先看留存。", "再看点击。", "最后决定放大、调整或停止。"], gap: "复盘结论和六库反哺仍需补齐。" }
];

const todayActions = [
  { title: "今天先看待发布", detail: "打开内容周测试计划表，确认今天哪些脚本/成片还没发布，先把发布链路推完。" },
  { title: "今天补昨天数据", detail: "把昨天已发布视频的数据、达人精灵和商品点击回填到数据回流表。" },
  { title: "今天清一个复盘卡点", detail: "如果数据已到观察期，至少补一条复盘结论或下周调整动作。" }
];

const gaps = [
  { title: "六库关联字段", detail: "缺少从成品回查钩子、卖点、场景、人群、BGM 的关联链。" },
  { title: "发布后复盘回流", detail: "需要固定 T+1/T+3/T+7 或同等观察周期的回填规则。" },
  { title: "选题/可视化/高光帧库", detail: "字段还薄，暂时更像草稿库。" },
  { title: "BGM 来源不明项", detail: "Original Sound 一类没有作者、来源视频或音频样本时不能标完成。" },
  { title: "公开网页实时数据", detail: "GitHub Pages 不能安全直连飞书，需要后端或静态快照。" }
];

const dailyProgress = [
  {
    target: "publish",
    title: "今日发布推进",
    status: "待核对",
    progress: 35,
    evidence: "需要从内容周测试计划表读取今日待发布和已发布数量。",
    blocker: "未接实时字段前，无法确认今天具体哪条视频卡住。",
    next: "飞书接通后按生产状态、发布状态、计划发布时间推导今日发布清单。"
  },
  {
    target: "data",
    title: "昨日/今日数据回填",
    status: "待核对",
    progress: 30,
    evidence: "视频数据、达人精灵、商品点击数据已独立成数据回流板块。",
    blocker: "需要确认已发布视频是否都绑定到对应周测计划。",
    next: "每天先补前一日发布内容的数据回流。"
  },
  {
    target: "review",
    title: "今日复盘动作",
    status: "待推进",
    progress: 20,
    evidence: "内容周复盘表已有结构。",
    blocker: "数据到期但复盘结论为空时，六库不能反哺。",
    next: "每天至少清一条到观察期的复盘记录。"
  },
  {
    target: "libraries",
    title: "今日补库动作",
    status: "待推进",
    progress: 25,
    evidence: "钩子库、卖点库、痛点库已有库存。",
    blocker: "有效资产还缺使用记录和数据表现。",
    next: "每天把当天拆解或复盘出的有效表达补进对应库。"
  }
];

const weeklyProgress = [
  {
    target: "source",
    title: "爆款样本与拆解入口",
    status: "推进中",
    progress: 60,
    evidence: "已有爆款视频脚本收集、开头钩子收集、中间叙事逻辑收集三个入口。",
    blocker: "新增样本还需要稳定补齐类目、人群、目的和父子关联。",
    next: "本周优先补新增爆款样本的拆解完整度。"
  },
  {
    target: "script",
    title: "周测计划到脚本生产",
    status: "待推进",
    progress: 35,
    evidence: "内容周测试计划表已有测试产品、站点、计划脚本数、生产状态字段。",
    blocker: "部分计划仍停在待发布，脚本、素材、账号和发布时间没有完全连起来。",
    next: "逐条检查本周计划：脚本是否完成、成片是否交付、发布时间是否明确。"
  },
  {
    target: "publish",
    title: "发布交付链路",
    status: "需要补证据",
    progress: 30,
    evidence: "周测试计划已有发布账号、计划发布视频数、已发布视频数、关联视频数据字段。",
    blocker: "发布记录和数据回流记录之间的关联还不够稳。",
    next: "每条已发布内容必须回填到对应视频数据表。"
  },
  {
    target: "data",
    title: "发布后数据回流",
    status: "推进中",
    progress: 45,
    evidence: "视频数据、达人精灵、商品点击数据已从爆款收集中拆出来，作为独立回流板块。",
    blocker: "数据表和周测计划之间还缺更稳定的关联字段与回填节奏。",
    next: "把英区/美区视频数据、达人精灵和商品点击数据统一绑定到周测计划。"
  },
  {
    target: "review",
    title: "复盘结论与六库反哺",
    status: "待建立",
    progress: 20,
    evidence: "内容周复盘表已有复盘结论、做得好/不好、下周动作字段。",
    blocker: "复盘内容偏空，暂时还不能反推哪类钩子、卖点、场景有效。",
    next: "先按 T+1/T+3/T+7 或固定观察周期补复盘结论。"
  },
  {
    target: "libraries",
    title: "六库有效性回查",
    status: "需要补数据",
    progress: 40,
    evidence: "钩子库、卖点库、痛点库已有库存，选题/可视化/高光帧库仍偏轻。",
    blocker: "缺少从发布后数据回查库资产表现的闭环。",
    next: "给库资产补使用记录、来源、关联周测计划和表现字段。"
  }
];

const contentChains = [
  {
    id: "1-US-BRAND-01",
    title: "Steam Roast 家庭晚餐流程",
    region: "US",
    type: "BRAND",
    script: "已写",
    cut: "已成片",
    publish: "已成片待发布",
    data: "未到期",
    review: "未到期",
    fileName: "1-US-BRAND-01.mp4",
    publishAccount: "",
    publishTime: "",
    videoUrl: "",
    dataSource: "内容生产全链路追踪表",
    matchMethod: "成片文件名匹配",
    metrics: { views: null },
    rawMetrics: {},
    issues: ["已成片，但未补发布时间、账号和视频链接。"],
    next: "发布后补视频链接、发布时间，并进入 T+1/T+3/T+7 数据回流。"
  },
  {
    id: "1-US-BRAND-02",
    title: "减少每天晚餐决策",
    region: "US",
    type: "BRAND",
    script: "已写",
    cut: "已成片",
    publish: "已成片待发布",
    data: "未到期",
    review: "未到期",
    fileName: "1-US-BRAND-02.mp4",
    publishAccount: "",
    publishTime: "",
    videoUrl: "",
    dataSource: "内容生产全链路追踪表",
    matchMethod: "成片文件名匹配",
    metrics: { views: null },
    rawMetrics: {},
    issues: ["已成片，但未补发布时间、账号和视频链接。"],
    next: "发布后补视频链接与发布时间。"
  },
  {
    id: "1-US-BRAND-03",
    title: "让做饭重新容易享受",
    region: "US",
    type: "BRAND",
    script: "已写",
    cut: "已成片",
    publish: "已发布",
    data: "数据冲突",
    review: "待校验",
    fileName: "1-US-BRAND-03.mp4",
    publishAccount: "ounin_official",
    publishTime: "2026-08-17 21:00",
    videoUrl: "https://www.tiktok.com/@ounin_official/video/7674941103509933342",
    dataSource: "视频数据-美区 / 已关联",
    matchMethod: "视频ID匹配",
    metrics: { views: 18 },
    rawMetrics: { views: 177 },
    issues: ["播放量冲突：结构化字段 Video/Photo Views=18，原始提取 Videoviews=177。"],
    next: "先校验数据采集表播放量，再回填全链路播放量；校验前不要进入复盘判断。"
  },
  {
    id: "1-UK-BRAND-01",
    title: "Steam Roast 家庭晚餐流程",
    region: "UK",
    type: "BRAND",
    script: "已写",
    cut: "已成片",
    publish: "已成片待发布",
    data: "未到期",
    review: "未到期",
    fileName: "1-UK-BRAND-01.mp4",
    publishAccount: "",
    publishTime: "",
    videoUrl: "",
    dataSource: "内容生产全链路追踪表",
    matchMethod: "成片文件名匹配",
    metrics: { views: null },
    rawMetrics: {},
    issues: ["已成片，但未补发布时间、账号和视频链接。"],
    next: "发布后补视频链接、发布时间，并进入 T+1/T+3/T+7 数据回流。"
  }
];

const navItems = [
  { id: "source", label: "爆款收集", icon: "S" },
  { id: "deconstruct", label: "拆解入库", icon: "D" },
  { id: "libraries", label: "六库弹药", icon: "L" },
  { id: "material", label: "素材底座", icon: "M" },
  { id: "script", label: "脚本生产", icon: "W" },
  { id: "publish", label: "发布交付", icon: "P" },
  { id: "data", label: "数据回流", icon: "G" },
  { id: "review", label: "复盘回流", icon: "R" },
  { id: "automation", label: "总控自动化", icon: "A" }
];

const statusMeta = {
  "进行中": { className: "status-active", dot: "#2f68d8" },
  "需要补库": { className: "status-gap", dot: "#b57914" },
  "需要补数据": { className: "status-data", dot: "#b57914" },
  "需要补素材": { className: "status-material", dot: "#2f68d8" },
  "部分可用": { className: "status-partial", dot: "#168463" },
  "需要补证据": { className: "status-blocked", dot: "#ba3f3f" },
  "待建立": { className: "status-todo", dot: "#687586" }
};

const filters = ["全部", "进行中", "部分可用", "需要补库", "需要补数据", "需要补素材", "待建立"];
let currentFilter = "全部";
let dashboardData = null;
let authState = {
  configured: false,
  authenticated: false,
  user: null,
  mode: "snapshot"
};
let detailCache = {};
let selectedWeek = "all";
let selectedStage = "publish";
let selectedChainId = "";

const overviewView = document.querySelector("#overviewView");
const detailView = document.querySelector("#detailView");
const authGate = document.querySelector("#authGate");
const authButton = document.querySelector("#authButton");
const authGateButton = document.querySelector("#authGateButton");
const controlNav = document.querySelector("#controlNav");
const moduleGrid = document.querySelector("#moduleGrid");
const snapshotGrid = document.querySelector("#snapshotGrid");
const workflowStepsEl = document.querySelector("#workflowSteps");
const statusFilters = document.querySelector("#statusFilters");
const snapshotStatus = document.querySelector("#snapshotStatus");
const template = document.querySelector("#moduleCardTemplate");

const runtimeConfig = window.CONTENT_FACTORY_CONFIG || {};
const configuredApiBase = runtimeConfig.apiBaseUrl === "same-origin"
  ? window.location.origin
  : String(runtimeConfig.apiBaseUrl || "");
const apiBaseUrl = (configuredApiBase || (window.location.hostname.endsWith(".vercel.app") ? window.location.origin : "")).replace(/\/$/, "");
authState.configured = Boolean(apiBaseUrl);

function apiUrl(path) {
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function fetchJson(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    credentials: "include",
    cache: "no-store",
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    const error = new Error(payload.error || `request ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function setSnapshotMode(reason) {
  authState.mode = "snapshot";
  if (reason) console.warn("Realtime API unavailable, using snapshot mode.", reason);
}

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

function numberedMarkup(items) {
  return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
}

function progressMarkup(items, emptyText = "暂无推进项；等待飞书实时数据回流。") {
  if (!items.length) return `<p>${escapeHtml(emptyText)}</p>`;
  return `
    <div class="progress-list">
      ${items.map((item) => `
        <div class="progress-item">
          <div class="progress-head">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.status)} / ${Number(item.progress || 0)}%</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <i style="width:${Math.max(0, Math.min(100, Number(item.progress || 0)))}%"></i>
          </div>
          <dl>
            <div><dt>当前证据</dt><dd>${escapeHtml(item.evidence)}</dd></div>
            <div><dt>卡点</dt><dd>${escapeHtml(item.blocker)}</dd></div>
            <div><dt>下一步</dt><dd>${escapeHtml(item.next)}</dd></div>
          </dl>
        </div>
      `).join("")}
    </div>
  `;
}

function getDailyReports() {
  if (dashboardData?.dailyReports?.length) return dashboardData.dailyReports;
  return (dashboardData?.dailyProgress || dailyProgress).map((item) => ({
    segment: item.segment || item.title,
    todayAdded: Number((item.status || "").match(/今日\s*(\d+)/)?.[1] || 0),
    todayDone: 0,
    weekTotal: Number((item.status || "").match(/本周\s*(\d+)/)?.[1] || 0),
    sourceTable: item.evidence || "静态默认数据",
    rule: item.rule || "等待快照脚本回填统计口径。",
    blocker: item.blocker === "暂无明确卡点。" ? "" : item.blocker,
    target: item.target || ""
  }));
}

function getStatsConfig(id) {
  const configs = {
    today: {
      title: "今日新增明细",
      eyebrow: "Daily Evidence",
      valueLabel: "今日新增",
      valueKey: "todayAdded",
      routeLabel: "stats / today",
      summary: "这里拆开看今天每个环节新增了多少。当前是环节级统计；具体新增了哪条脚本、哪首音乐，下一步要在快照里继续加入脱敏条目摘要。"
    },
    week: {
      title: "本周累计明细",
      eyebrow: "Weekly Evidence",
      valueLabel: "本周累计",
      valueKey: "weekTotal",
      routeLabel: "stats / week",
      summary: "这里把本周累计按生产环节拆开，避免 80 这种总数看起来很大但不知道来自哪里。"
    },
    segments: {
      title: "统计环节与口径",
      eyebrow: "Tracking Scope",
      valueLabel: "统计环节",
      valueKey: "weekTotal",
      routeLabel: "stats / segments",
      summary: "这里说明总控台现在追踪哪些环节、每个环节从哪张表或文档统计、用什么日期口径。"
    },
    blockers: {
      title: "卡点环节明细",
      eyebrow: "Blocked Evidence",
      valueLabel: "卡点",
      valueKey: "weekTotal",
      routeLabel: "stats / blockers",
      summary: "这里只看无法稳定自动统计的环节。主要原因通常是缺日期字段、缺完成状态或缺可回读证据。"
    }
  };
  return configs[id] || configs.today;
}

function statsRowsFor(id) {
  const rows = getDailyReports();
  if (id === "blockers") return rows.filter((row) => row.blocker);
  if (id === "today") return [...rows].sort((a, b) => Number(b.todayAdded || 0) - Number(a.todayAdded || 0));
  if (id === "week") return [...rows].sort((a, b) => Number(b.weekTotal || 0) - Number(a.weekTotal || 0));
  return rows;
}

function statsTotal(rows, config, id) {
  if (id === "segments") return rows.length;
  if (id === "blockers") return rows.length;
  return rows.reduce((sum, row) => sum + Number(row[config.valueKey] || 0), 0);
}

function statsItemsMarkup(items = []) {
  if (!items.length) return `<p class="stats-empty-items">当前快照未输出条目级明细；只能看到环节数量、来源和口径。</p>`;
  return `
    <div class="stats-items">
      <span>新增条目</span>
      ${items.map((item) => `
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <em>${escapeHtml([item.type, item.site, item.source].filter(Boolean).join(" / ") || "条目摘要")}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function statsSourceLinksMarkup(sourceUrl) {
  const urls = String(sourceUrl || "")
    .split(/\s+/)
    .map((url) => url.trim())
    .filter(Boolean);
  if (!urls.length) return "";
  return `
    <div class="stats-source-actions">
      ${urls.map((url, index) => `
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
          ${urls.length > 1 ? `打开来源 ${index + 1}` : "打开来源"}
        </a>
      `).join("")}
    </div>
  `;
}

function statsRowMarkup(rows, config, id) {
  if (!rows.length) return `<p>当前没有匹配的统计明细。</p>`;
  return `
    <div class="stats-evidence-list">
      ${rows.map((row) => {
        const primaryValue = id === "segments"
          ? `今日 ${Number(row.todayAdded || 0)} / 本周 ${Number(row.weekTotal || 0)}`
          : id === "blockers"
            ? "待补"
            : Number(row[config.valueKey] || 0);
        const blocker = row.blocker ? `<p class="stats-blocker">${escapeHtml(row.blocker)}</p>` : "";
        return `
          <article class="stats-evidence-row">
            <div class="stats-row-main">
              <div>
                <span>${escapeHtml(row.week || "当前快照")}</span>
                <h4>${escapeHtml(row.segment || row.title || "未命名环节")}</h4>
              </div>
              <strong>${escapeHtml(primaryValue)}</strong>
            </div>
            <dl>
              <div><dt>今日新增</dt><dd>${Number(row.todayAdded || 0)}</dd></div>
              <div><dt>今日完成</dt><dd>${Number(row.todayDone || 0)}</dd></div>
              <div><dt>本周累计</dt><dd>${Number(row.weekTotal || 0)}</dd></div>
              <div><dt>来源</dt><dd>${escapeHtml(row.sourceTable || "未绑定来源")}</dd></div>
            </dl>
            <p>${escapeHtml(row.rule || "暂无统计口径。")}</p>
            ${statsItemsMarkup(row.items || [])}
            ${blocker}
            ${statsSourceLinksMarkup(row.sourceUrl)}
            ${row.target ? `<button class="text-link-button" type="button" data-target="${escapeHtml(row.target)}">进入对应环节</button>` : ""}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderStatsDetail(id) {
  const config = getStatsConfig(id);
  const rows = statsRowsFor(id);
  const total = statsTotal(rows, config, id);
  const generatedAt = formatGeneratedAt(dashboardData?.generatedAt);
  const snapshotLabel = generatedAt ? `快照 ${generatedAt}` : "静态默认数据";

  overviewView.hidden = true;
  detailView.hidden = false;
  detailView.innerHTML = `
    <div class="detail-shell">
      <div class="detail-toolbar">
        <button class="icon-button back-button" type="button" id="backToOverview">
          <span aria-hidden="true">←</span>
          <span>总览</span>
        </button>
        <span class="detail-route">${escapeHtml(config.routeLabel)}</span>
      </div>

      <header class="detail-hero stats-hero">
        <div class="detail-icon" style="background:#2f68d8">#</div>
        <div>
          <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
          <h3>${escapeHtml(config.title)}</h3>
          <p>${escapeHtml(config.summary)}</p>
        </div>
        <span class="stats-total"><b>${escapeHtml(total)}</b><em>${escapeHtml(config.valueLabel)}</em></span>
      </header>

      <section class="stats-summary-grid">
        <article class="detail-card">
          <span>数据来源</span>
          <p>${escapeHtml(dashboardData?.source?.name || "Tiktok内容工厂")} / ${escapeHtml(snapshotLabel)}</p>
        </article>
        <article class="detail-card">
          <span>当前粒度</span>
          <p>环节级日报：能看到每个环节今天和本周的数量、来源表、统计口径；还不是 record 级清单。</p>
        </article>
      </section>

      <section class="detail-card wide">
        <span>数字拆解</span>
        ${statsRowMarkup(rows, config, id)}
      </section>
    </div>
  `;

  document.querySelector("#backToOverview").addEventListener("click", () => {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    routeFromHash();
  });
  detailView.querySelectorAll(".text-link-button[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = `module/${button.dataset.target}`;
    });
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resourceMarkup(resources) {
  if (!resources.length) return `<p>暂无可跳转入口。</p>`;
  return `
    <div class="resource-grid">
      ${resources.map((resource) => {
        const hasUrl = Boolean(resource.url);
        const tag = hasUrl ? "a" : "div";
        const attrs = hasUrl ? ` href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer"` : ` aria-disabled="true"`;
        return `
        <${tag} class="resource-link${hasUrl ? "" : " is-disabled"}"${attrs}>
          <span class="resource-meta">${escapeHtml(resource.type)}${resource.count == null ? "" : ` / ${resource.count} 条`}</span>
          <strong>${escapeHtml(resource.name)}</strong>
          <em>${hasUrl ? "打开飞书" : "暂无入口"}</em>
        </${tag}>
      `;
      }).join("")}
    </div>
  `;
}

function findDetail(type, id) {
  if (type === "module") return factoryModules.find((item) => item.id === id);
  if (type === "library") return libraries.find((item) => item.id === id);
  if (type === "workflow") return workflowSteps.find((item) => item.id === id);
  return null;
}

function getDetailKey(type, id) {
  return `${type}/${id}`;
}

function getSnapshotDetail(type, id) {
  return detailCache[getDetailKey(type, id)] || dashboardData?.detailPages?.[getDetailKey(type, id)] || null;
}

function getSnapshotLibrary(item) {
  return dashboardData?.libraries?.[item.id] || {};
}

function formatGeneratedAt(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function getDetailSummary(type, item) {
  if (type === "module") return item.role;
  if (type === "library") return `这个库用于${item.use}，当前状态是${item.status}。`;
  return item.detail;
}

function buildFallbackDetail(type, item) {
  return {
    task: getDetailSummary(type, item),
    resources: [],
    tutorial: item.usage || [],
    requiredFields: item.fields || [],
    acceptance: ["能按当前步骤完成一次真实处理。", "关键字段不为空。", "处理结果能回到对应表或库。"],
    mistakes: ["只写结论不留证据。", "处理后不回填状态。", "多个测试目标混在一条记录里。"]
  };
}

function getScopedProgress(items, type, id) {
  if (type === "module" || type === "workflow") {
    return items.filter((item) => item.target === id || (id === "libraries" && ["libraries", "hook", "selling", "audience-pain", "scene", "material", "bgm"].includes(item.target)));
  }
  if (type === "library") {
    return items.filter((item) => ["libraries", id].includes(item.target));
  }
  return items.slice(0, 3);
}

function getDailyProgress(type, id) {
  return getScopedProgress(dashboardData?.dailyProgress || dailyProgress, type, id);
}

function getWeeklyProgress(type, id) {
  return getScopedProgress(dashboardData?.weeklyProgress || weeklyProgress, type, id);
}

function renderMetrics() {
  const metrics = dashboardData?.metrics;
  const chains = getContentChains();
  const total = metrics?.chainTotal ?? chains.length;
  const published = metrics?.publishDone ?? chains.filter((chain) => isDoneStage(chain, "publish")).length;
  document.querySelector("#tableAssetCount").textContent = ratioText(metrics?.scriptDone ?? chains.filter((chain) => isDoneStage(chain, "script")).length, total);
  document.querySelector("#materialCount").textContent = ratioText(metrics?.cutDone ?? chains.filter((chain) => isDoneStage(chain, "cut")).length, total);
  document.querySelector("#stepCount").textContent = ratioText(published, total);
  document.querySelector("#gapCount").textContent = ratioText(metrics?.dataDone ?? chains.filter((chain) => isDoneStage(chain, "data")).length, published);

  if (snapshotStatus) {
    if (authState.configured && !authState.authenticated) {
      snapshotStatus.textContent = "已配置实时后端 / 等待飞书登录";
      snapshotStatus.classList.remove("loaded");
      snapshotStatus.classList.add("locked");
    } else if (dashboardData) {
      const generatedAt = formatGeneratedAt(dashboardData.generatedAt);
      const extra = generatedAt ? ` / 快照 ${generatedAt}` : "";
      const modeLabel = authState.mode === "live" ? "实时只读" : "快照模式";
      snapshotStatus.textContent = `${dashboardData.source?.name || "TikTok 内容工厂"} / ${modeLabel}${extra}`;
      snapshotStatus.classList.add("loaded");
      snapshotStatus.classList.remove("locked");
    } else {
      snapshotStatus.textContent = "静态默认数据，等待快照加载";
      snapshotStatus.classList.remove("loaded");
      snapshotStatus.classList.remove("locked");
    }
  }
}

function attachMetricRoutes() {
  document.querySelectorAll(".stats-card[data-stats-id]").forEach((card) => {
    if (card.dataset.routeReady === "true") return;
    card.dataset.routeReady = "true";
    const openStats = () => {
      const stageMap = { today: "script", week: "cut", segments: "publish", blockers: "data" };
      selectedStage = stageMap[card.dataset.statsId] || "publish";
      selectedWeek = "all";
      selectedChainId = "";
      renderProgressBoard();
      renderChainQualityBoard();
      document.querySelector("#chainQualityBoard")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    card.addEventListener("click", openStats);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStats();
      }
    });
  });
}

function renderAuthControls() {
  if (!authButton || !authGate || !authGateButton) return;

  const loginUrl = apiUrl(runtimeConfig.loginPath || "/api/auth/login");
  const logoutUrl = apiUrl(runtimeConfig.logoutPath || "/api/auth/logout");

  if (!authState.configured) {
    authButton.hidden = true;
    authGate.hidden = true;
    return;
  }

  authButton.hidden = false;
  authButton.querySelector("span:last-child").textContent = authState.authenticated
    ? `${authState.user?.name || "已登录"} / 退出`
    : "飞书登录";
  authButton.onclick = async () => {
    if (!authState.authenticated) {
      window.location.href = loginUrl;
      return;
    }
    try {
      await fetchJson(runtimeConfig.logoutPath || "/api/auth/logout");
    } catch (error) {
      console.warn("logout request failed", error);
    }
    authState.authenticated = false;
    authState.user = null;
    dashboardData = null;
    await loadSnapshotData("logout");
    routeFromHash();
  };

  authGateButton.onclick = () => {
    window.location.href = loginUrl;
  };
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
      <span class="nav-status" style="background:${(statusMeta[module.status] || statusMeta["待建立"]).dot}"></span>
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
    const snapshot = getSnapshotLibrary(item);
    const status = snapshot.status || item.status;
    const meta = statusMeta[status] || statusMeta["待建立"];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "snapshot-card clickable-card";
    card.innerHTML = `
      <div class="snapshot-icon" style="background:${item.color}">${escapeHtml(item.title.slice(0, 1))}</div>
      <div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(snapshot.use || item.use)} / ${escapeHtml(snapshot.count || item.count)}</p>
      </div>
      <span class="${meta.className}">${escapeHtml(status)}</span>
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
    statusPill.classList.add((statusMeta[item.status] || statusMeta["待建立"]).className);

    node.querySelector(".role").textContent = item.role;
    node.querySelector(".evidence").textContent = item.evidence;
    node.querySelector(".next").textContent = item.next;
    node.querySelector(".links").textContent = item.links.join("、");
    node.querySelector(".gap").textContent = item.gap;

    const priority = document.createElement("div");
    priority.className = "card-footer";
    priority.innerHTML = `<span class="priority-chip">${escapeHtml(item.priority)}</span><span class="open-hint">进入工作页</span>`;
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
  const items = dashboardData?.todayActions?.length ? dashboardData.todayActions : todayActions;
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${index + 1}</b><p>${escapeHtml(item.title)}<span>${escapeHtml(item.detail)}</span></p>`;
    list.appendChild(li);
  });
}

function renderGaps() {
  const list = document.querySelector("#gapList");
  list.innerHTML = "";
  const items = dashboardData?.gaps?.length ? dashboardData.gaps : gaps;
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "decision-item";
    div.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p>`;
    list.appendChild(div);
  });
}

function firstSourceUrl(row) {
  return String(row.sourceUrl || "").split(/\s+/).find(Boolean) || "";
}

function rowStatus(row) {
  if (row.blocker) return "卡点";
  if (Number(row.todayAdded || 0) > 0) return "今日有推进";
  if (Number(row.weekTotal || 0) > 0) return "本周有推进";
  return "今日为 0";
}

function getContentChains() {
  return dashboardData?.contentChains?.length ? dashboardData.contentChains : contentChains;
}

function isDoneStage(chain, stage) {
  const value = {
    script: chain.script,
    cut: chain.cut,
    publish: chain.publish,
    data: chain.data
  }[stage] || "";
  if (stage === "script") return /已写|已选用/.test(value);
  if (stage === "cut") return /已成片/.test(value);
  if (stage === "publish") return /已发布/.test(value);
  if (stage === "data") return /已回流/.test(value);
  return false;
}

function chainHasIssue(chain) {
  return Boolean(chain.issues?.length || /冲突|异常|错|阻塞|缺失/.test(`${chain.data || ""} ${chain.blocker || ""}`));
}

function weekIndex(label) {
  const match = String(label || "").match(/第([一二三四五六七八九十\d]+)周/);
  const map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  return Number(match?.[1]) || map[match?.[1]] || 999;
}

function buildWeeksFromChains() {
  const groups = new Map();
  getContentChains().forEach((chain) => {
    const key = chain.week || "未分周";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(chain);
  });
  return [...groups.entries()].map(([week, items]) => ({
    id: week,
    label: week,
    total: items.length,
    scriptDone: items.filter((chain) => isDoneStage(chain, "script")).length,
    cutDone: items.filter((chain) => isDoneStage(chain, "cut")).length,
    publishDone: items.filter((chain) => isDoneStage(chain, "publish")).length,
    dataDone: items.filter((chain) => isDoneStage(chain, "data")).length,
    issues: items.filter(chainHasIssue).length
  })).sort((a, b) => weekIndex(a.label) - weekIndex(b.label));
}

function ratioText(done, total) {
  return `${Number(done || 0)}/${Number(total || 0)}`;
}

function stageLabel(stage) {
  return { script: "脚本", cut: "剪辑", publish: "发布", data: "数据" }[stage] || stage;
}

function stageDoneField(stage) {
  return { script: "scriptDone", cut: "cutDone", publish: "publishDone", data: "dataDone" }[stage] || "scriptDone";
}

function stageTotalForWeek(week, stage) {
  return stage === "data" ? Number(week.publishDone || 0) : Number(week.total || 0);
}

function filteredChainsForSelection() {
  return getContentChains().filter((chain) => selectedWeek === "all" || chain.week === selectedWeek);
}

function selectedStageChains() {
  return filteredChainsForSelection().sort((a, b) => {
    const aDone = isDoneStage(a, selectedStage) ? 1 : 0;
    const bDone = isDoneStage(b, selectedStage) ? 1 : 0;
    return aDone - bDone || Number(chainHasIssue(b)) - Number(chainHasIssue(a)) || String(a.id).localeCompare(String(b.id), "zh-CN");
  });
}

function chainStatusClass(value) {
  if (!value) return "chain-status is-empty";
  if (/冲突|异常|错|阻塞/.test(value)) return "chain-status is-error";
  if (/已发布|已回流|可复盘|已成片|已写/.test(value)) return "chain-status is-done";
  if (/待|未|到期/.test(value)) return "chain-status is-waiting";
  return "chain-status";
}

function metricText(chain) {
  const current = chain.metrics?.views;
  const raw = chain.rawMetrics?.views;
  if (current == null && raw == null) return "暂无";
  if (raw != null && current !== raw) return `${current ?? "空"} / 原始 ${raw}`;
  return String(current ?? raw);
}

function renderChainQualityBoard() {
  const board = document.querySelector("#chainQualityBoard");
  if (!board) return;
  const chains = selectedStageChains();
  const allChains = getContentChains();
  if (!chains.length) {
    board.innerHTML = `<p class="empty-note">还没有逐条链路数据；等待全链路追踪表接入。</p>`;
    return;
  }
  const conflictCount = allChains.filter(chainHasIssue).length;
  const selectedChain = allChains.find((chain) => chain.id === selectedChainId) || chains[0];
  selectedChainId = selectedChain?.id || "";
  board.innerHTML = `
    <div class="chain-quality-summary">
      <strong>${allChains.length}</strong>
      <span>全部链路</span>
      <b>${conflictCount}</b>
      <span>条需处理</span>
      <button class="text-link-button" type="button" data-week-all>看全部周</button>
    </div>
    <div class="stage-toolbar">
      ${["script", "cut", "publish", "data"].map((stage) => `
        <button class="${selectedStage === stage ? "active" : ""}" type="button" data-stage-tab="${stage}">${escapeHtml(stageLabel(stage))}</button>
      `).join("")}
      <span>${escapeHtml(selectedWeek === "all" ? "全部周" : selectedWeek)} / ${escapeHtml(stageLabel(selectedStage))}</span>
    </div>
    <div class="chain-workbench">
      <div class="chain-list">
        ${chains.map((chain) => {
          const issue = chain.issues?.[0] || "";
          const selected = chain.id === selectedChainId ? " active" : "";
          return `
            <button class="chain-list-item${selected} ${issue ? "has-issue" : ""}" type="button" data-chain-id="${escapeHtml(chain.id)}">
              <strong>${escapeHtml(chain.id)}</strong>
              <span>${escapeHtml(chain.week || "")} / ${escapeHtml(chain.region || "")} / ${escapeHtml(chain.type || "")}</span>
              <em>${escapeHtml(chain.title || "未填标题")}</em>
              <small>${escapeHtml(stageLabel(selectedStage))}: ${escapeHtml({ script: chain.script, cut: chain.cut, publish: chain.publish, data: chain.data }[selectedStage] || "未知")}${issue ? ` · ${escapeHtml(issue)}` : ""}</small>
            </button>
          `;
        }).join("")}
      </div>
      ${renderChainDetailCard(selectedChain)}
    </div>
  `;
  board.querySelector("[data-week-all]")?.addEventListener("click", () => {
    selectedWeek = "all";
    selectedChainId = "";
    renderProgressBoard();
    renderChainQualityBoard();
  });
  board.querySelectorAll("[data-stage-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStage = button.dataset.stageTab || "publish";
      selectedChainId = "";
      renderProgressBoard();
      renderChainQualityBoard();
    });
  });
  board.querySelectorAll("[data-chain-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedChainId = button.dataset.chainId || "";
      renderChainQualityBoard();
    });
  });
  board.querySelectorAll("[data-chain-action]").forEach((button) => {
    button.addEventListener("click", () => updateChainAction(button.dataset.chainAction, button.dataset.recordId));
  });
}

function renderChainDetailCard(chain) {
  if (!chain) return `<aside class="chain-detail-card"><p>请选择一条内容。</p></aside>`;
  const issueMarkup = chain.issues?.length
    ? chain.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")
    : "<li>暂无明显异常。</li>";
  const videoLink = chain.videoUrl ? `<a href="${escapeHtml(chain.videoUrl)}" target="_blank" rel="noopener noreferrer">打开 TikTok 视频</a>` : "";
  const canWrite = authState.configured && authState.authenticated && authState.mode === "live" && chain.recordId;
  return `
    <aside class="chain-detail-card">
      <div class="chain-detail-head">
        <span>${escapeHtml(chain.week || "")}</span>
        <h4>${escapeHtml(chain.id)}</h4>
        <p>${escapeHtml(chain.title || "未填标题")}</p>
      </div>
      <dl class="chain-detail-grid">
        <div><dt>脚本</dt><dd class="${chainStatusClass(chain.script)}">${escapeHtml(chain.script || "未知")}</dd></div>
        <div><dt>剪辑</dt><dd class="${chainStatusClass(chain.cut)}">${escapeHtml(chain.cut || "未知")}</dd></div>
        <div><dt>发布</dt><dd class="${chainStatusClass(chain.publish)}">${escapeHtml(chain.publish || "未知")}</dd></div>
        <div><dt>数据</dt><dd class="${chainStatusClass(chain.data)}">${escapeHtml(chain.data || "未知")}</dd></div>
        <div><dt>成片</dt><dd>${escapeHtml(chain.fileName || "未绑定")}</dd></div>
        <div><dt>发布账号</dt><dd>${escapeHtml(chain.publishAccount || "未填")}</dd></div>
        <div><dt>发布时间</dt><dd>${escapeHtml(chain.publishTime || "未填")}</dd></div>
        <div><dt>播放量</dt><dd>${escapeHtml(metricText(chain))}</dd></div>
      </dl>
      <div class="chain-detail-section">
        <span>问题/缺口</span>
        <ul>${issueMarkup}</ul>
      </div>
      <div class="chain-detail-section">
        <span>下一步</span>
        <p>${escapeHtml(chain.next || "暂无下一步。")}</p>
      </div>
      <div class="chain-actions">
        ${videoLink}
        <button type="button" data-chain-action="needs_publish_info" data-record-id="${escapeHtml(chain.recordId || "")}" ${canWrite ? "" : "disabled"}>标记待补发布</button>
        <button type="button" data-chain-action="waiting_data" data-record-id="${escapeHtml(chain.recordId || "")}" ${canWrite ? "" : "disabled"}>标记待回流</button>
        <button type="button" data-chain-action="clear_conflict" data-record-id="${escapeHtml(chain.recordId || "")}" ${canWrite ? "" : "disabled"}>冲突已处理</button>
      </div>
      ${canWrite ? "" : `<p class="write-disabled-note">登录飞书实时模式后，才可写入追踪表状态。</p>`}
    </aside>
  `;
}

async function updateChainAction(action, recordId) {
  if (!recordId || !authState.authenticated || authState.mode !== "live") return;
  try {
    const payload = await fetchJson("/api/chain-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, recordId })
    });
    snapshotStatus.textContent = `已写入追踪表并回读：${payload.action}`;
    snapshotStatus.classList.add("loaded");
    await loadRealtimeDashboard();
    renderOverview();
  } catch (error) {
    snapshotStatus.textContent = `写入失败：${error.payload?.message || error.message}`;
    snapshotStatus.classList.remove("loaded");
    snapshotStatus.classList.add("locked");
  }
}

function renderDailyBrief() {
  const line = document.querySelector("#briefLine");
  const chips = document.querySelector("#briefChips");
  if (!line || !chips) return;

  const rows = getDailyReports();
  const chains = getContentChains();
  const todayRows = rows.filter((row) => Number(row.todayAdded || 0) > 0);
  const zeroRows = rows.filter((row) => Number(row.todayAdded || 0) === 0);
  const blockers = rows.filter((row) => row.blocker);
  const chainIssues = chains.filter((chain) => chain.issues?.length || /冲突|异常|错|阻塞/.test(chain.data || ""));
  const totalToday = rows.reduce((sum, row) => sum + Number(row.todayAdded || 0), 0);
  const totalWeek = rows.reduce((sum, row) => sum + Number(row.weekTotal || 0), 0);
  const sourceText = todayRows.length
    ? todayRows.map((row) => `${row.segment} ${row.todayAdded}`).join(" + ")
    : "暂无新增";

  const weeks = dashboardData?.weeks?.length ? dashboardData.weeks : buildWeeksFromChains();
  const total = chains.length;
  const cutDone = chains.filter((chain) => isDoneStage(chain, "cut")).length;
  const publishDone = chains.filter((chain) => isDoneStage(chain, "publish")).length;
  const dataDone = chains.filter((chain) => isDoneStage(chain, "data")).length;
  line.textContent = `当前追踪 ${total} 条：已成片 ${cutDone}，已发布 ${publishDone}，已数据回流 ${dataDone}；待处理 ${chainIssues.length} 条。${weeks.length ? `可按 ${weeks.map((week) => week.label).join("、")} 查看。` : ""}`;
  chips.innerHTML = [
    { label: "未剪辑", value: chains.filter((chain) => !isDoneStage(chain, "cut")).length, stage: "cut" },
    { label: "待发布", value: chains.filter((chain) => isDoneStage(chain, "cut") && !isDoneStage(chain, "publish")).length, stage: "publish" },
    { label: "待回流", value: chains.filter((chain) => isDoneStage(chain, "publish") && !isDoneStage(chain, "data")).length, stage: "data" },
  ].map((chip) => `
    <button class="brief-chip" type="button" data-stage="${chip.stage}">
      <strong>${chip.value}</strong>
      <span>${chip.label}</span>
    </button>
  `).join("");

  chips.querySelectorAll(".brief-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStage = button.dataset.stage || "publish";
      selectedWeek = "all";
      selectedChainId = "";
      renderProgressBoard();
      renderChainQualityBoard();
    });
  });
}

function renderProgressBoard() {
  const table = document.querySelector("#progressTable");
  if (!table) return;
  const weeks = dashboardData?.weeks?.length ? dashboardData.weeks : buildWeeksFromChains();
  const stages = ["script", "cut", "publish", "data"];
  table.innerHTML = `
    <div class="funnel-row funnel-head-row">
      <span>周次</span>
      <span>脚本</span>
      <span>剪辑</span>
      <span>发布</span>
      <span>数据</span>
      <span>异常</span>
    </div>
    ${weeks.map((week) => {
      return `
        <div class="funnel-row">
          <button class="week-button ${selectedWeek === week.label ? "active" : ""}" type="button" data-week="${escapeHtml(week.label)}" data-stage="${escapeHtml(selectedStage)}">
            <strong>${escapeHtml(week.label)}</strong>
            <small>${Number(week.total || 0)} 条内容</small>
          </button>
          ${stages.map((stage) => {
            const done = Number(week[stageDoneField(stage)] || 0);
            const total = stageTotalForWeek(week, stage);
            const active = selectedWeek === week.label && selectedStage === stage ? " active" : "";
            const behind = total > 0 && done < total ? " is-behind" : "";
            return `<button class="funnel-cell${active}${behind}" type="button" data-week="${escapeHtml(week.label)}" data-stage="${stage}">
              <b>${ratioText(done, total)}</b>
              <small>${escapeHtml(stageLabel(stage))}</small>
            </button>`;
          }).join("")}
          <button class="funnel-cell issue-cell ${Number(week.issues || 0) ? "is-behind" : ""}" type="button" data-week="${escapeHtml(week.label)}" data-stage="${escapeHtml(selectedStage)}">
            <b>${Number(week.issues || 0)}</b>
            <small>待处理</small>
          </button>
        </div>
      `;
    }).join("")}
  `;
  table.querySelectorAll("[data-week][data-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedWeek = button.dataset.week || "all";
      selectedStage = button.dataset.stage || selectedStage;
      selectedChainId = "";
      renderProgressBoard();
      renderChainQualityBoard();
    });
  });
}

function renderBlockerBoard() {
  const board = document.querySelector("#blockerBoard");
  if (!board) return;
  const blockers = getDailyReports().filter((row) => row.blocker);
  if (!blockers.length) {
    board.innerHTML = `<p class="empty-note">当前没有明确卡点。</p>`;
    return;
  }
  board.innerHTML = blockers.map((row) => {
    const url = firstSourceUrl(row);
    return `
      <article class="blocker-item">
        <strong>${escapeHtml(row.segment)}</strong>
        <p>${escapeHtml(row.blocker)}</p>
        ${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">去补这张表</a>` : ""}
      </article>
    `;
  }).join("");
}

function renderQuickLinks() {
  const box = document.querySelector("#quickLinks");
  if (!box) return;
  const wanted = ["爆款视频脚本收集表", "开头钩子收集", "内容周测试计划表", "内容周复盘表", "音乐库收集文档", "钩子库"];
  const resources = dashboardData?.resources || [];
  const links = wanted
    .map((name) => resources.find((item) => item.name === name))
    .filter((item) => item?.url);
  box.innerHTML = links.length ? links.map((item) => `
    <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(item.type || "入口")}</span>
      <strong>${escapeHtml(item.name)}</strong>
    </a>
  `).join("") : `<p class="empty-note">快照还没有入口链接。</p>`;
}

function renderWeeklyProgressSummary() {
  const list = document.querySelector("#weeklyProgressList");
  if (!list) return;
  const items = (dashboardData?.weeklyProgress || weeklyProgress);
  list.innerHTML = items.map((item) => `
    <button class="rail-progress-item" type="button" data-target="${escapeHtml(item.target)}">
      <span>${escapeHtml(item.title)}</span>
      <b>${escapeHtml(item.status)} / ${Number(item.progress || 0)}%</b>
      <i><em style="width:${Math.max(0, Math.min(100, Number(item.progress || 0)))}%"></em></i>
    </button>
  `).join("");
  list.querySelectorAll(".rail-progress-item").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = `module/${button.dataset.target}`;
    });
  });
}

function renderOverview() {
  renderAuthControls();
  renderMetrics();
  attachMetricRoutes();
  renderDailyBrief();
  renderProgressBoard();
  renderBlockerBoard();
  renderChainQualityBoard();
  renderQuickLinks();
  renderFilters();
  renderNav();
  renderWorkflow();
  renderSnapshot();
  renderCards();
  renderTodayActions();
  renderWeeklyProgressSummary();
  renderGaps();
}

function renderDetail(type, id, options = {}) {
  const item = findDetail(type, id);
  if (!item) {
    window.location.hash = "";
    return;
  }

  const snapshot = type === "library" ? getSnapshotLibrary(item) : {};
  const detail = getSnapshotDetail(type, id) || buildFallbackDetail(type, item);
  const status = snapshot.status || item.status || "流程步骤";
  const gap = snapshot.gap || item.gap || "暂无明确缺口。";
  const next = item.next || "按当前步骤执行后，把结果回到对应表或库。";
  const dailyItems = getDailyProgress(type, id);
  const weeklyItems = getWeeklyProgress(type, id);
  const fields = detail.requiredFields?.length ? detail.requiredFields : item.fields || [];
  const advancedItems = [
    fields.length ? `字段/口径：${fields.join("、")}` : "",
    detail.acceptance?.length ? `完成判定：${detail.acceptance.join("；")}` : "",
    detail.mistakes?.length ? `注意事项：${detail.mistakes.join("；")}` : "",
  ].filter(Boolean);

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
          <p class="eyebrow">${type === "module" ? "Command Workbench" : type === "library" ? "Library Workbench" : "Workflow Workbench"}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(detail.task || (type === "library" && snapshot.use ? `这个库用于${snapshot.use}，当前状态是${status}。` : getDetailSummary(type, item)))}</p>
        </div>
        <span class="status-pill ${statusMeta[status]?.className || "status-todo"}">${escapeHtml(status)}</span>
      </header>

      <section class="detail-live-note operator-note">
        <strong>这个页面只看进度，不在这里编辑</strong>
        <p>要新增、修改或补数据，直接点下面的飞书入口；网页只负责汇总今日/本周进展和卡点。</p>
      </section>

      <section class="detail-grid workbench-grid">
        <article class="detail-card">
          <span>每日推进进度</span>
          ${progressMarkup(dailyItems, "暂无每日推进项；等待飞书实时数据回流。")}
        </article>

        <article class="detail-card">
          <span>每周推进进度</span>
          ${progressMarkup(weeklyItems, "暂无每周推进项；等待飞书实时数据回流。")}
        </article>

        <article class="detail-card wide resource-card">
          <span>要编辑就打开这里</span>
          ${resourceMarkup(detail.resources || [])}
        </article>

        <article class="detail-card compact warning">
          <span>当前卡点</span>
          <p>${escapeHtml(gap)}</p>
        </article>

        <article class="detail-card compact next">
          <span>下一步动作</span>
          <p>${escapeHtml(next)}</p>
        </article>

        <details class="detail-card wide detail-more">
          <summary>展开查看字段口径和旧说明</summary>
          ${advancedItems.length ? listMarkup(advancedItems) : "<p>暂无更多说明。</p>"}
        </details>
      </section>
    </div>
  `;

  document.querySelector("#backToOverview").addEventListener("click", () => {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    routeFromHash();
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (!options.skipRefresh) refreshLiveDetail(type, id);
}

async function refreshLiveDetail(type, id) {
  if (!authState.configured || !authState.authenticated || authState.mode !== "live") return;
  const key = getDetailKey(type, id);
  try {
    const payload = await fetchJson(`/api/detail?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`);
    if (!payload.detail) return;
    detailCache[key] = payload.detail;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === key) renderDetail(type, id, { skipRefresh: true });
  } catch (error) {
    console.warn("live detail unavailable", error);
  }
}

function routeFromHash() {
  renderAuthControls();
  if (authState.configured && !authState.authenticated) {
    authGate.hidden = false;
    overviewView.hidden = true;
    detailView.hidden = true;
    renderMetrics();
    return;
  }
  authGate.hidden = true;

  const hash = window.location.hash.replace(/^#/, "");
  const [type, id] = hash.split("/");
  if (!type || !id) {
    overviewView.hidden = false;
    detailView.hidden = true;
    renderOverview();
    return;
  }
  if (type === "stats") {
    renderOverview();
    renderStatsDetail(id);
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

async function checkSession() {
  if (!authState.configured) return;
  try {
    const payload = await fetchJson("/api/session");
    authState.authenticated = Boolean(payload.authenticated);
    authState.user = payload.user || null;
  } catch (error) {
    authState.authenticated = false;
    authState.user = null;
    setSnapshotMode(error);
  }
}

async function loadRealtimeDashboard() {
  if (!authState.configured || !authState.authenticated) return false;
  try {
    const payload = await fetchJson("/api/dashboard");
    if (!payload.dashboard) throw new Error("dashboard payload missing");
    dashboardData = payload.dashboard;
    authState.mode = "live";
    detailCache = {};
    return true;
  } catch (error) {
    setSnapshotMode(error);
    return false;
  }
}

async function loadSnapshotData(reason) {
  try {
    const response = await fetch("dashboard-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`snapshot ${response.status}`);
    dashboardData = await response.json();
    if (authState.mode !== "live") authState.mode = "snapshot";
  } catch (error) {
    dashboardData = null;
    console.warn("dashboard-data.json unavailable, using static defaults.", reason || error);
  }
}

async function loadDashboardData() {
  await checkSession();
  const hasLiveData = await loadRealtimeDashboard();
  if (!hasLiveData && !(authState.configured && !authState.authenticated)) {
    await loadSnapshotData("realtime unavailable");
  }
  routeFromHash();
}

window.addEventListener("hashchange", routeFromHash);
routeFromHash();
loadDashboardData();
