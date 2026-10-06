import { initCapture } from "@replayio/self-healing-capture";

let capture: ReturnType<typeof initCapture> | null = null;

export function getSelfHealingCapture() {
  if (typeof window === "undefined") return null;
  if (!capture) {
    capture = initCapture({
      orgId: process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID!,
      endpoint: "/api/self-healing/session",
      onError: (error) => console.error("Session capture failed", error),
    });
  }
  return capture;
}
