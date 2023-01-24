// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDpStudioHttpOption } from './utils';
import config from './config/config';
import axios from 'axios';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const httpOptions = await getDpStudioHttpOption();
  const reqBody = { redirectSource: 'http://localhost:3000' };
  let response = await axios.post(
    config.dpStudioApiEndPoint + '/auth/login',
    reqBody,
    httpOptions
  );
  res.redirect(response.data);
}
