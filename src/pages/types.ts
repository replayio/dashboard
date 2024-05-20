import { Cookies } from "@/constants";
// eslint-disable-next-line no-restricted-imports
import { NextApiRequest as NextApiRequestUntyped } from "next";

export type NextApiRequest<Query = {}> = Omit<NextApiRequestUntyped, "cookies" | "query"> & {
  cookies: Readonly<Record<Cookies, string>>;
  query: Query;
};
