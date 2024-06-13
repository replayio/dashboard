import { NextApiRequest, NextApiResponse } from "next";

const { FORM_CARRY_TOKEN } = process.env;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { body } = request;
    const { text: message, userEmail: email, userName: name, ...rest } = body;

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
      body: JSON.stringify({
        name,
        email,
        message,
        ...rest,
      }),
    });

    if (formCarryResponse.status !== 200) {
      const text = await formCarryResponse.text();

      console.log(`[/api/feedback] response ${formCarryResponse.status}`);
      console.log(text);

      response.status(formCarryResponse.status).send({ error: true });
    } else {
      const json = await formCarryResponse.json();

      console.log(`[/api/feedback] response ${formCarryResponse.status}`);
      console.log(json);

      if (json.code === 200) {
        response.status(200).send({ success: true });
      } else {
        response.status(json.code).send({ error: true });
      }
    }
  } catch (error) {
    console.error(error);

    response.status(500).send({ error: true });
  }
}
