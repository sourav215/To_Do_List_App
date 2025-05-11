import { isRejectedWithValue } from "@reduxjs/toolkit";
import { parseError } from "../../utils/parseError";

export const errorMiddleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message = parseError(action.payload);
    alert(`Error: ${message}`);
  }

  return next(action);
};
