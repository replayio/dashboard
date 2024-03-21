import { NextApiRequest, NextApiResponse } from "next";

const { FORM_CARRY_TOKEN } = process.env;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { body } = request;

    const url = `https://formcarry.com/s/${FORM_CARRY_TOKEN}`;

    console.log("[/api/feedback] request");
    console.log(body);

    // https://formcarry.com/form/nextjs-contact-form
    const formCarryResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });

    const json = await formCarryResponse.json();

    console.log(`[/api/feedback] response ${formCarryResponse.status}`);
    console.log(json);

    if (json.code === 200) {
      response.status(200).send({ success: true });
    } else {
      response.status(json.code).send({ error: true });
    }
  } catch (error) {
    console.error(error);

    response.status(500).send({ error: true });
  }
}
