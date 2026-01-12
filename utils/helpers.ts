export function decodeToken(token: string) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}
