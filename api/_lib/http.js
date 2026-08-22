const crypto = require("crypto");

const SESSION_COOKIE = "content_factory_session";
const STATE_COOKIE = "content_factory_oauth_state";
const DEFAULT_ORIGIN = "https://qizhuxia.github.io";

function getAllowedOrigin(req) {
  const configured = (process.env.ALLOWED_ORIGIN || process.env.FRONTEND_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, "");
  const origin = req.headers.origin;
  if (origin && origin.replace(/\/$/, "") === configured) return origin;
  return configured;
}

function applyCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", getAllowedOrigin(req));
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

function json(req, res, status, payload) {
  applyCors(req, res);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function redirect(res, target) {
  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
}

function parseCookies(req) {
  return Object.fromEntries(String(req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const index = part.indexOf("=");
      if (index === -1) return [part, ""];
      return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
    }));
}

function getSecret() {
  return process.env.SESSION_SECRET || process.env.FEISHU_APP_SECRET || "";
}

function sign(value) {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function getEncryptionKey() {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return crypto.createHash("sha256").update(secret).digest();
}

function encodeSigned(payload) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const body = `${iv.toString("base64url")}.${tag.toString("base64url")}.${encrypted.toString("base64url")}`;
  return `${body}.${sign(body)}`;
}

function decodeSigned(value) {
  if (!value || !value.includes(".")) return null;
  const parts = value.split(".");
  if (parts.length !== 4) return null;
  const signature = parts.pop();
  const body = parts.join(".");
  const expected = sign(body);
  if (Buffer.byteLength(signature) !== Buffer.byteLength(expected)) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const [ivText, tagText, encryptedText] = parts;
  const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivText, "base64url"));
  decipher.setAuthTag(Buffer.from(tagText, "base64url"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "base64url")),
    decipher.final()
  ]);
  const payload = JSON.parse(decrypted.toString("utf8"));
  if (payload.expiresAt && Date.now() > payload.expiresAt) return null;
  return payload;
}

function cookieOptions({ maxAge = 7200, clear = false } = {}) {
  const secure = process.env.NODE_ENV === "production";
  const pieces = [
    "Path=/",
    "HttpOnly",
    "SameSite=None",
    `Max-Age=${clear ? 0 : maxAge}`
  ];
  if (secure) pieces.push("Secure");
  return pieces.join("; ");
}

function setSignedCookie(res, name, payload, maxAge) {
  appendSetCookie(res, `${encodeURIComponent(name)}=${encodeURIComponent(encodeSigned(payload))}; ${cookieOptions({ maxAge })}`);
}

function clearCookie(res, name) {
  appendSetCookie(res, `${encodeURIComponent(name)}=; ${cookieOptions({ clear: true })}`);
}

function appendSetCookie(res, cookie) {
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", cookie);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, cookie]);
  } else {
    res.setHeader("Set-Cookie", [existing, cookie]);
  }
}

function setSession(res, authData) {
  const expiresAt = Date.now() + Math.min(Number(authData.expires_in || 7200), 7200) * 1000;
  setSignedCookie(res, SESSION_COOKIE, {
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
    expiresAt,
    user: {
      name: authData.name || authData.en_name || "Feishu User",
      avatarUrl: authData.avatar_thumb || authData.avatar_url || ""
    }
  }, 7200);
}

function getSession(req) {
  const value = parseCookies(req)[SESSION_COOKIE];
  return decodeSigned(value);
}

function requireSession(req, res) {
  const session = getSession(req);
  if (!session?.accessToken) {
    json(req, res, 401, { ok: false, error: "not_authenticated" });
    return null;
  }
  return session;
}

function createState(res) {
  const nonce = crypto.randomBytes(18).toString("base64url");
  setSignedCookie(res, STATE_COOKIE, { nonce, expiresAt: Date.now() + 10 * 60 * 1000 }, 600);
  return nonce;
}

function verifyState(req, value) {
  const state = decodeSigned(parseCookies(req)[STATE_COOKIE]);
  return Boolean(state?.nonce && value && state.nonce === value);
}

function sanitizeIdLike(value) {
  return String(value || "")
    .replace(/(open_id|union_id|user_id|record_id|field_id|app_token|table_id|tenant_access_token|access_token|refresh_token)/gi, "[hidden]");
}

module.exports = {
  SESSION_COOKIE,
  STATE_COOKIE,
  applyCors,
  json,
  redirect,
  createState,
  verifyState,
  setSession,
  getSession,
  requireSession,
  clearCookie,
  sanitizeIdLike
};
