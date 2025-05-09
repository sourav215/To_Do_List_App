import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ErrorCode } from "../types/apiResponse";

const timeoutError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err?.timeout) {
    sendResponse(
      res,
      503,
      false,
      "Request timed out. Please try again.",
      null,
      {
        code: ErrorCode.REQUEST_TIMEOUT,
        details: err.message || "Request exceeded time limit.",
      }
    );
    return;
  }

  if (req.timedout) return;

  return sendResponse(res, 500, false, "Failed to fetch todos", null, {
    code: ErrorCode.INTERNAL_ERROR,
    details: err instanceof Error ? err.message : "Unexpected error",
  });
};

export default timeoutError;
