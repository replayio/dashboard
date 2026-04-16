import { NextApiRequest, NextApiResponse } from "next";

const { FORM_CARRY_TOKEN } = process.env;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!FORM_CARRY_TOKEN) {
    return response.status(500).json({ error: "Feedback service is not configured" });
  }

  try {
    const { body } = request;
    const { text: message, userEmail: email, userName: name, ...rest } = body;

    const url = `https://formcarry.com/s/${FORM_CARRY_TOKEN}`;

    const formCarryResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        ...rest,
      }),
    });

    if (formCarryResponse.status !== 200) {
      response.status(formCarryResponse.status).send({ error: true });
    } else {
      const json = await formCarryResponse.json();

      if (json.code === 200) {
        response.status(200).send({ success: true });
      } else {
        response.status(json.code).send({ error: true });
      }
    }
  } catch (error) {
    console.error("[/api/feedback] internal error");

    response.status(500).send({ error: true });
  }
}
