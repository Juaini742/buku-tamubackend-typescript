import {Request, Response, NextFunction} from "express";
import {secretKey} from "../utils/secretKety";
const jwt = require("jsonwebtoken");

export const extractUserIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const tokenHeader = req.headers.authorization;

    if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
      const token = tokenHeader.split(" ")[1];
      const decodedToken: any = jwt.verify(token, secretKey);
      req.user_id = decodedToken.user_id;
    }
  } catch (error) {
    console.error("Error extracting user_id:", error.message);
  }

  next();
};
