const { applyCors, json, requireSession } = require("./_lib/http");
const { isConfigured } = require("./_lib/feishu");
const { buildLiveDashboard, getDetailFromDashboard } = require("./_lib/dashboard");

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  if (!isConfigured()) return json(req, res, 503, { ok: false, error: "feishu_not_configured" });

  const session = requireSession(req, res);
  if (!session) return;

  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const type = url.searchParams.get("type") || "";
  const id = url.searchParams.get("id") || "";

  try {
    const dashboard = await buildLiveDashboard(session.accessToken);
    const detail = getDetailFromDashboard(dashboard, type, id);
    if (!detail) return json(req, res, 404, { ok: false, error: "detail_not_found" });
    json(req, res, 200, { ok: true, detail });
  } catch (error) {
    json(req, res, error.status || 500, {
      ok: false,
      error: "detail_read_failed",
      message: error.payload?.msg || error.message
    });
  }
};
