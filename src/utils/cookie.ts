export function getCookieValue(name: string): string | null {
  const value =
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ??
    null;
  return value !== null ? JSON.parse(value) : null;
}

export function setCookieValue(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)};path=/`;
}
