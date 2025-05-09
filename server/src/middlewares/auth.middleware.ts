import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";
import { ErrorCode } from "../types/apiResponse";
import { JwtPayload } from "../types/jwt";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) {
    sendResponse(res, 401, false, "Token Missing", null, {
      code: ErrorCode.UNAUTHORIZED,
      details: "Authorization header is not Provided",
    });
    return;
  }

  const token = authHeader.split(" ")?.[1];
  if (!token) {
    sendResponse(res, 401, false, "Token Missing", null, {
      code: ErrorCode.UNAUTHORIZED,
      details: "Bearer token is not found in the header.",
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, false, "Invalid or expired token", null, {
      code: ErrorCode.UNAUTHORIZED,
      details:
        error instanceof Error
          ? error.message
          : "JWT token verification failed.",
    });
  }
};
