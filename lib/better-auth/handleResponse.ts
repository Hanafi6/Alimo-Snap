// lib/api-response.ts
import {
  ApiResponseSuccess,
  ApiResponseError,
  HandleSuccessResponseInput,
  HandleErrorResponseInput,
} from "@/lib/types";

export function handleSuccessResponse<T>({
  statusCode = 200,
  message,
  data,
}: HandleSuccessResponseInput<T>) {
  const responsePayload: ApiResponseSuccess<T> = {
    statusCode,
    status: "success",
    ...(message && { message }),
    data,
  };

  return Response.json(responsePayload, { status: statusCode });
}

export function handleErrorResponse({
  statusCode,
  message,
  details,
}: HandleErrorResponseInput) {
  const responsePayload: ApiResponseError = {
    statusCode,
    message,
    status: statusCode < 500 ? "fail" : "error",
    ...(details && { details }),
  };

  return Response.json(responsePayload, { status: statusCode });
}