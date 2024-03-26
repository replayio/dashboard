import { v4 as uuid } from "uuid";

export function getUID(prefix: string): string {
  return `${prefix}-${uuid()}`;
}
