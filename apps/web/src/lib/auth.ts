import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "songglow_admin";

export function isAdminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_TOKEN);
}

export function verifyAdminPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || "";
}

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return Boolean(session && session === getAdminSessionToken());
}

