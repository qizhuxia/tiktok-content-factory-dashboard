const { applyCors, clearCookie, json, SESSION_COOKIE } = require("../_lib/http");

module.exports = function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  clearCookie(res, SESSION_COOKIE);
  json(req, res, 200, { ok: true });
};
