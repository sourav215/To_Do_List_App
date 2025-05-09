export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  FORBIDDEN = "FORBIDDEN",
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
}

export interface ApiError {
  code: ErrorCode;
  details?: string | string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: ApiError | null;
}
