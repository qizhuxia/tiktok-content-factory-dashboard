const { applyCors, getSession, json } = require("./_lib/http");

module.exports = function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });

  const session = getSession(req);
  if (!session?.accessToken) return json(req, res, 200, { ok: true, authenticated: false });
  json(req, res, 200, {
    ok: true,
    authenticated: true,
    user: {
      name: session.user?.name || "Feishu User",
      avatarUrl: session.user?.avatarUrl || ""
    }
  });
};
