// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Stripe, { loadStripe } from "@stripe/stripe-js";
import { Example } from "../../../libs/types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Example>,
  han: NextApiHandler<NextApiHandler>
) => {
  res.status(200).json({ name: "hello" });
};
