export const dynamic = "force-static";

/**
 * Site-ownership proof for Replay QA's security pass.
 *
 * The security pass sends real attack traffic (injection, access-control, data-exposure probes), so
 * Replay QA only runs it against an origin that echoes a value it minted for the project. Serving that
 * value here is what proves someone with deploy access to app.replay.io asked for the testing — it is
 * re-checked at the start of every run, so removing this route silently disables the pass.
 *
 * The values are public by design: a nonce is worthless to anyone who cannot publish it on this origin.
 *
 * One entry per Replay QA project pointed at this origin. The checker looks for its own value anywhere
 * in the first 4KB of the body, so several can coexist and each project still verifies. To rotate or
 * add one, copy the value out of the project's ownership card ("Confirm you own this app").
 */
const NONCES = ["loopqa-sec-ebOEENkgEsa628cN4PwRBlRAiWiKSRAmoEeHiBJcKpo"];

export function GET() {
  return new Response(NONCES.join("\n") + "\n", {
    status: 200,
    headers: {
      // Plain text, unwrapped: the checker reads the body as-is and matches the value exactly.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
