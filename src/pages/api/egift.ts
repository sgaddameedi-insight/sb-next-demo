// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
//import { getDpStudioHttpOption } from "./utils";
//import config from "./config/config";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = await axios.get("https://dummyjson.com/products/5");
  console.log(response.data);
  return res.status(200).send(response.data);
}
