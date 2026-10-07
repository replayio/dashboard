import { initCapture } from "@replayio/self-healing-capture";

// Initialized once at module scope on the client, before the app renders.
// SSR also evaluates this module into a null, where the capture package
// refuses to run.
export const selfHealingCapture =
  typeof window === "undefined"
    ? null
    : initCapture({
        orgId: "o-259WSX-na1",
        endpoint: "/api/self-healing/session",
        maxNetworkCaptureBytes: 1000000,
      });
