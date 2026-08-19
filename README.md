# 内容工厂总控台

这是 TikTok 内容工厂的网页总控台。当前采用 GitHub Pages 静态快照版：本地脚本只读飞书并生成脱敏 `dashboard-data.json`，网页直接读取快照展示每日/每周环节进展。

## 当前版本

- 主数据源口径：Tiktok内容工厂
- 展示内容：生产闭环、六库弹药状态、今日动作、待补缺口
- 数据模式：读取公开脱敏快照 `dashboard-data.json`
- 登录模式：当前不启用飞书登录；实时后端暂缓
- 当前边界：第一版只读，不写表、不改字段、不删记录

## 快照更新流程

当前推荐流程：

1. 本地运行总控台脚本，只读 `Tiktok内容工厂`。
2. 更新 `内容生产环节日报` 的每日/每周统计。
3. 生成新的 `dashboard-data.json`。
4. 提交并推送 GitHub，GitHub Pages 自动刷新。

## 后端实时模式

实时后端已经验证过 Vercel 方案，但当前网络访问 `vercel.app` 会超时，因此暂缓。后续如果重新启用实时 API，再把 `config.js` 的 `apiBaseUrl` 改为可访问的后端域名，例如：

```js
window.CONTENT_FACTORY_CONFIG = {
  apiBaseUrl: "https://your-api-host.example.com",
  loginPath: "/api/auth/login",
  logoutPath: "/api/auth/logout"
};
```

保持 `apiBaseUrl: ""` 时，网页不会请求后端，只读取 `dashboard-data.json`。

## 安全边界

- 不包含飞书 token
- 不包含 lark-cli 身份凭据
- 不包含实时接口密钥
- 快照不包含 `open_id`、`record_id`、`field_id` 或 token
- 第一版只返回表名、字段名、记录数、状态统计，不展示 record 级明细
