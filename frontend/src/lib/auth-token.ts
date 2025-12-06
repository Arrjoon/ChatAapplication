export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; access_token=`);
  if (parts.length === 2) return parts.pop()!.split(";")[0];

  return null;
}
