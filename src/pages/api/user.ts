// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDpStudioHttpOption } from './utils';
import config from './config/config';
import { AuthError } from './error/errors';
import axios from 'axios';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const httpOptions = await getDpStudioHttpOption();
        const reqBody = {'iagCode' : req.query.code};
        let response = await axios.post(config.dpStudioApiEndPoint + '/auth/user', reqBody, httpOptions);
        res.status(200).json(response.data);
    }
    catch (err) {
        next(new AuthError(403, err.message));
    }
}
