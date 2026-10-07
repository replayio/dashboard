import { initCapture } from "@replayio/self-healing-capture";

// Initialized once from MyApp's constructor, before the first render.
export const selfHealingCapture = initCapture({
  orgId: "o-259WSX-na1",
  endpoint: "/api/self-healing/session",
  maxNetworkCaptureBytes: 1000000,
});
