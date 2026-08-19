# 内容工厂总控台

这是 TikTok 内容工厂的网页总控台。前端可继续用 GitHub Pages，后端用 Vercel API 以登录用户身份只读飞书。

## 当前版本

- 主数据源口径：Tiktok内容工厂
- 展示内容：生产闭环、六库弹药状态、今日动作、待补缺口
- 数据模式：优先读取 Vercel API 实时数据；失败时回退公开脱敏快照 `dashboard-data.json`
- 登录模式：飞书 OAuth 登录，后端保存加密 httpOnly 会话 cookie
- 当前边界：第一版只读，不写表、不改字段、不删记录

## Vercel 环境变量

按 `.env.example` 在 Vercel Project Settings 里配置：

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`
- `FEISHU_REDIRECT_URI`
- `SESSION_SECRET`
- `CONTENT_FACTORY_APP_TOKEN`
- `CONTENT_FACTORY_BASE_URL`
- `CONTENT_FACTORY_TABLES`
- `FRONTEND_ORIGIN`
- `ALLOWED_ORIGIN`

## GitHub Pages 接入 Vercel API

部署 Vercel 后，把 `config.js` 里的 `apiBaseUrl` 改为 Vercel 域名，例如：

```js
window.CONTENT_FACTORY_CONFIG = {
  apiBaseUrl: "https://your-vercel-project.vercel.app",
  loginPath: "/api/auth/login",
  logoutPath: "/api/auth/logout"
};
```

如果把整站也部署到 Vercel，前端会自动用同源 `/api`。

## 安全边界

- 不包含飞书 token
- 不包含 lark-cli 身份凭据
- 不包含实时接口密钥
- API 不返回 `open_id`、`record_id`、`field_id` 或 token
- 第一版只返回表名、字段名、记录数、状态统计和飞书入口，不展示 record 级明细
