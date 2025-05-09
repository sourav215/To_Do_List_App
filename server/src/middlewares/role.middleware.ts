import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ErrorCode } from "../types/apiResponse";

export interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
      userCode: string;
      role: string;
    };
  }
export const authorizeRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return sendResponse(res, 403, false, "Forbidden", null, {
        code: ErrorCode.FORBIDDEN,
        details: `Access denied. Requires role: ${role}`,
      });
    }
    next();
  };
};
