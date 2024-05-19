import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const createToken = (paylod) => {
  return jwt.sign(paylod, JWT_SECRET, { expiresIn: "24h" });
};

export const validateToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
