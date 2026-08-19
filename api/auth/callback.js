const { clearCookie, json, redirect, setSession, verifyState, STATE_COOKIE } = require("../_lib/http");
const { exchangeCodeForUserToken, getFrontendUrl, isConfigured } = require("../_lib/feishu");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(req, res, 405, { ok: false, error: "method_not_allowed" });
  if (!isConfigured()) return redirect(res, getFrontendUrl("?auth=not_configured"));

  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !verifyState(req, state)) {
    return redirect(res, getFrontendUrl("?auth=invalid_state"));
  }

  try {
    const authData = await exchangeCodeForUserToken(code);
    setSession(res, authData);
    clearCookie(res, STATE_COOKIE);
    redirect(res, getFrontendUrl("?auth=ok"));
  } catch (error) {
    redirect(res, getFrontendUrl("?auth=failed"));
  }
};
