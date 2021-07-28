import { SECRET } from "../app";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const validateToken: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json("Acces denied");

  const payload = jwt.verify(token, SECRET) as IPayload;

  req.userId = payload._id;

  next();
};
