import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config";
import { JwtPayload } from "../types/jwt";

export const generateToken = (
  id: string,
  userCode: string,
  role: string
): string => {
  return jwt.sign({ id, userCode, role }, CONFIG.JWT_SECRET, {
    expiresIn: "24h",
  }) as string;
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, CONFIG.JWT_SECRET) as JwtPayload;
};
