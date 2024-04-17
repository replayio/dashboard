export function deleteCookieValueClient(name: string) {
  document.cookie = name + "=; expires=-1; Max-Age=-99999999; path=/;";
}

export function getCookieValueClient(name: string): string | null {
  const value =
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ??
    null;
  return value !== null ? JSON.parse(value) : null;
}

export function setCookieValueClient(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)}; path=/`;
}

export interface AccessTokenCookie {
  token: string;
  source: string;
}
