// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDpStudioHttpOption } from './utils';
import config from './config/config';
import axios from 'axios';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const httpOptions = await getDpStudioHttpOption();
    const reqBody = { iagCode: req.query.code };
    let response = await axios.post(
    config.dpStudioApiEndPoint + '/auth/logout',
    reqBody,
    httpOptions
    );
    res.redirect(response.data);
}
