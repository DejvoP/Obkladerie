export const ADMIN_AUTH_COOKIE = "obkladerie-admin";
export const ADMIN_AUTH_VALUE = "1";

export function adminAuthCookie(maxAgeSeconds = 60 * 60 * 24 * 7) {
  return `${ADMIN_AUTH_COOKIE}=${ADMIN_AUTH_VALUE}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearAdminAuthCookie() {
  return `${ADMIN_AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
