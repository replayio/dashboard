import basex from "base-x";

const base62 = basex("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

// Inspired by createRandomAPIKey() at github.com/replayio/backend/blob/aa62531dc834cc45c522c36e68c834278089f14d/src/shared/crypto.ts
export function generateApiKey() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  return `rwk_${base62.encode(array)}`;
}