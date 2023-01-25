// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { getDpStudioHttpOption } from "./utils";
// import config from "./config/config";
import { AuthError } from "./error/errors";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let response = await axios.get("https://dummyjson.com/products/1");
    console.log(response.data);
    return res.status(200).send(response.data);
  } catch (err) {
    new AuthError(403, err.message);
  }
}
