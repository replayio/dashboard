export function setAccessTokenInBrowserPrefs(token: string | null) {
  window.dispatchEvent(
    new window.CustomEvent("WebChannelMessageToChrome", {
      detail: JSON.stringify({
        id: "record-replay-token",
        message: { token },
      }),
    })
  );
}

export function requestBrowserLogin() {
  window.dispatchEvent(
    new window.CustomEvent("WebChannelMessageToChrome", {
      detail: JSON.stringify({
        id: "record-replay-token",
        message: { type: "login" },
      }),
    })
  );
}

export function listenForAccessToken(callback: (accessToken: string) => void) {
  const listener = (ev: any) => {
    window.removeEventListener("WebChannelMessageToContent", listener);
    const { error, token } = ev.detail?.message || {};
    if (token && !error) {
      callback(token);
    }
  };

  window.addEventListener("WebChannelMessageToContent", listener);

  window.dispatchEvent(
    new window.CustomEvent("WebChannelMessageToChrome", {
      detail: JSON.stringify({
        id: "record-replay-token",
        message: { type: "connect" },
      }),
    })
  );
}
