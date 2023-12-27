import {Request, Response, NextFunction} from "express";
const {User_details} = require("../db/models");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../utils/secretKety");

export const validateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new Error("Authorization is missing"));
    }

    const [bearer, tokenValue] = token.split(" ");
    if (bearer !== "Bearer" || !tokenValue) {
      throw new Error("Invalid token format");
    }

    const decodedToken = jwt.verify(tokenValue, secretKey, {
      expiresIn: "1h",
    });

    if (decodedToken.exp <= Date.now() / 1000) {
      throw new Error("Token has expired");
    }

    const userDetail = await User_details.findOne({
      where: {token: tokenValue},
    });

    if (!userDetail) {
      throw new Error("You are not authenticated to access this data");
    }

    next();
  } catch (error) {
    return next(error);
  }
};
