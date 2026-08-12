// Admin credentials mapping. The admin panel accepts the username "SveArt5"
// with password "sveart2026@1", which maps to the Supabase Auth account below.
export const ADMIN_USERNAME = 'SveArt5';
export const ADMIN_PASSWORD = 'sveart2026@1';
export const ADMIN_EMAIL = 'sveart@sveart.bg';

export function resolveAdminEmail(username: string, password: string): string | null {
  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return ADMIN_EMAIL;
  }
  return null;
}
