import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ip, token } = req.query;

  try {
    const result = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: process.env.CAPTCHA_SECRET_KEY,
        response: token,
        remoteIp: ip,
      },
    });
    res.status(200).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "fk u" });
  }
}
