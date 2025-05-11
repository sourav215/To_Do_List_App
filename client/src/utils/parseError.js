export const parseError = (errorPayload) => {
  if (!errorPayload) return "Unknown error occurred";
  if (typeof errorPayload === "string") return errorPayload;

  if (errorPayload.message) return errorPayload.message;
  if (errorPayload.error?.details) return errorPayload.error.details;

  return "Something went wrong";
};
