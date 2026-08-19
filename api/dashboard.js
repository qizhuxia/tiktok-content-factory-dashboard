const { applyCors, json, requireSession } = require("./_lib/http");
const { isConfigured } = require("./_lib/feishu");
const { buildLiveDashboard } = require("./_lib/dashboard");

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  if (!isConfigured()) return json(req, res, 503, { ok: false, error: "feishu_not_configured" });

  const session = requireSession(req, res);
  if (!session) return;

  try {
    const dashboard = await buildLiveDashboard(session.accessToken);
    json(req, res, 200, { ok: true, dashboard });
  } catch (error) {
    json(req, res, error.status || 500, {
      ok: false,
      error: "dashboard_read_failed",
      message: error.payload?.msg || error.message
    });
  }
};
