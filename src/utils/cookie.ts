export function getCookieValueClient(name: string): string | null {
  const value =
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ??
    null;
  return value !== null ? JSON.parse(value) : null;
}

export function setCookieValueClient(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)};path=/`;
}
