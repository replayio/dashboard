/**
 * Receives session-capture batches from @replayio/self-healing-capture and forwards
 * them to the Self Healing service. The account credential lives server-side only;
 * the browser must never see it.
 *
 * Bodies are passed through as text without parsing, so malformed capture payloads
 * are rejected by the service itself rather than by this route.
 */
const REQUIRED_ENV_VARS = ["SELF_HEALING_URL", "SELF_HEALING_API_KEY"] as const;

export async function POST(request: Request): Promise<Response> {
  const missingEnvVars = REQUIRED_ENV_VARS.filter(name => !process.env[name]);

  if (missingEnvVars.length > 0) {
    // Preview deployments run without Vercel secrets; fail gracefully so capture
    // uploads don't surface as crashed requests.
    console.error(
      `Self Healing session route missing environment variables: ${missingEnvVars.join(", ")}`
    );
    return Response.json(
      { error: "Self Healing integration is not configured on this deployment" },
      { status: 500 }
    );
  }

  const response = await fetch(
    new URL("/api/v1/connection/sessions", process.env.SELF_HEALING_URL),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SELF_HEALING_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: await request.text(),
    }
  );

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
