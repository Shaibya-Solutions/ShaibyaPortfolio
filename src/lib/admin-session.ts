import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { getPortfolioAdmin } from "@/lib/supabase/admin";

const cookieName = "shaibya_cms_session";
const sessionSeconds = 4 * 60 * 60;

function settings() {
  const password = process.env.PORTFOLIO_ADMIN_PASSWORD;
  const secret = process.env.PORTFOLIO_ADMIN_SESSION_SECRET;
  if (!password || password.length < 24 || !secret || secret.length < 32) return null;
  return { password, secret };
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function signature(token: string, config: NonNullable<ReturnType<typeof settings>>) {
  return createHmac("sha256", config.secret).update(digest(config.password)).update(token).digest("hex");
}

export async function hasAdminSession() {
  const config = settings();
  const cookie = (await cookies()).get(cookieName)?.value;
  if (!config || !cookie) return false;

  const [expires, nonce, mac] = cookie.split(".");
  if (!/^\d{10,11}$/.test(expires) || !/^[a-f0-9]{32}$/.test(nonce || "") ||
      !/^[a-f0-9]{64}$/.test(mac || "") || Number(expires) <= Math.floor(Date.now() / 1000)) return false;

  const expected = signature(`${expires}.${nonce}`, config);
  return timingSafeEqual(Buffer.from(mac, "hex"), Buffer.from(expected, "hex"));
}

export async function createAdminSession(password: string) {
  const config = settings();
  if (!config) return "The portfolio admin login is not configured.";
  if (typeof password !== "string" || password.length > 256) return "Incorrect portfolio password.";

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "local";
  const clientKey = createHmac("sha256", config.secret).update(ip).digest("hex");
  const { data: allowed, error } = await getPortfolioAdmin().rpc("allow_admin_login", {
    client_key_hash: clientKey,
  });
  if (error) {
    console.error("Portfolio admin login rate limit failed", error.code);
    return "Unable to sign in right now.";
  }
  if (!allowed) return "Too many sign-in attempts. Try again in 15 minutes.";
  if (!timingSafeEqual(digest(password), digest(config.password))) return "Incorrect portfolio password.";

  const expires = Math.floor(Date.now() / 1000) + sessionSeconds;
  const token = `${expires}.${randomBytes(16).toString("hex")}`;
  (await cookies()).set(cookieName, `${token}.${signature(token, config)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: sessionSeconds,
  });
  return null;
}

export async function clearAdminSession() {
  (await cookies()).set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 0,
  });
}
