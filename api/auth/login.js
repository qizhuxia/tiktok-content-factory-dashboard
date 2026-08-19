const { applyCors, createState, json, redirect } = require("../_lib/http");
const { buildAuthUrl, getFrontendUrl, isConfigured } = require("../_lib/feishu");

module.exports = function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  if (!isConfigured()) {
    return redirect(res, getFrontendUrl("?auth=not_configured"));
  }

  try {
    const state = createState(res);
    redirect(res, buildAuthUrl(state));
  } catch (error) {
    json(req, res, 500, { ok: false, error: "login_failed", message: error.message });
  }
};
