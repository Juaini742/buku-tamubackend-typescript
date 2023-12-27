import {Request, Response} from "express";
import {secretKey} from "../utils/secretKety";
const {User_details} = require("../db/models");
const jwt = require("jsonwebtoken");

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.sendStatus(401);
      return;
    }

    const user_detail = await User_details.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!user_detail) {
      res.sendStatus(400);
      return;
    }

    const token: string = jwt.sign({user_id: user_detail.user_id}, secretKey, {
      expiresIn: "1h",
    });

    await User_details.update(
      {token},
      {
        where: {
          user_id: user_detail.user_id,
        },
      }
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
