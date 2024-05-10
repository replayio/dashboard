import { URLS } from "@/constants";
import { NextApiRequest, NextApiResponse } from "next";

export type Release = {
  architecture: string | null;
  buildId: string;
  buildFile: string;
  platform: string;
  releaseFile: string;
  runtime: string;
  time: string;
  version: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const json = await fetchReleases();
  res.status(200).json(json);
}

export async function fetchReleases() {
  const response = await fetch(`${URLS.api}/v1/releases`);
  const releases = await response.json();
  return releases as Release[];
}
