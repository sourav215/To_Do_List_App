import { Response } from "express";
import { ApiError, ApiResponse } from "../types/apiResponse";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null,
  error: ApiError | null = null
): void => {
  res.status(statusCode).json({
    success,
    message,
    data,
    error,
  } as ApiResponse<T>);
};
