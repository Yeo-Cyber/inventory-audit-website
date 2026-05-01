import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "cms_session";

function getSecret() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "development-only-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionValue(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      exp: Date.now() + 1000 * 60 * 60 * 8,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value?: string) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  const givenBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    givenBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(givenBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp: number;
    };

    return session.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  return verifySessionValue(cookieStore.get(cookieName)?.value);
}

export async function setAdminSession(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionValue(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
