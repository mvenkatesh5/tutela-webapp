// next imports
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

export const isMeetValid =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { room } = await req.body;

    try {
      if (!T_AWS_ACCESS_KEY_ID || !T_AWS_SECRET_ACCESS_KEY) {
        res.status(400).json({
          status: "credentials_missing",
          message: "AWS credentials are not valid.",
        });
      }

      // Checking the room id from the parameters
      if (!room) {
        res.status(400).json({
          status: "room_missing",
          message: "Room query param is missing.",
        });
      }

      return await fn(req, res);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  };
