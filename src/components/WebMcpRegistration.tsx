"use client";

import { useEffect } from "react";

/**
 * Registers minimal WebMCP tool metadata when the browser supports
 * `navigator.modelContext` (experimental; Chrome WebMCP / related proposals).
 */
export function WebMcpRegistration() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: { provideContext: (context: unknown) => void };
    };
    if (!nav.modelContext?.provideContext) return;

    try {
      nav.modelContext.provideContext({
        tools: [
          {
            name: "open_replay_documentation",
            description: "Open Replay product documentation (https://docs.replay.io).",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            execute: async () => ({
              result: "https://docs.replay.io",
            }),
          },
          {
            name: "replay_agent_discovery",
            description:
              "Lists well-known discovery paths for this Replay Dashboard deployment (api-catalog, OAuth metadata, agent skills).",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            execute: async () => ({
              result: {
                api_catalog: "/.well-known/api-catalog",
                oauth_protected_resource: "/.well-known/oauth-protected-resource",
                openid_configuration: "/.well-known/openid-configuration",
                agent_skills: "/.well-known/agent-skills/index.json",
                mcp_server_card: "/.well-known/mcp/server-card.json",
                replay_devtools: "/recording/",
              },
            }),
          },
        ],
      });
    } catch {
      // API is experimental; ignore failures.
    }
  }, []);

  return null;
}
