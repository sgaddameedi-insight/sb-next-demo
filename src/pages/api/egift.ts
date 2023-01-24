// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDpStudioHttpOption } from "./utils";
import config from "./config/config";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
      const httpOptions = await getEgiftHttpOption(Guid.create.toString());
      const reqBody = {};
      let response = await axios.post(
        config.egiftApiEndPoint + "/egift",
        reqBody,
        httpOptions
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(new AuthError(403, err.message));
    }
}
