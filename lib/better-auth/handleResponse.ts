type HandleSuccessResponse = {
  statusCode: number;
  message?: string;
  data?: Record<string, unknown> | Record<string, unknown>[];
};

type HandleErrorResponse = {
  statusCode: number;
  message: string;
  details?: Record<string, unknown> | null;
};

export function handleSuccessResponse({
  statusCode,
  message,
  data,
}: HandleSuccessResponse) {
  return Response.json(
    {
      statusCode,
      status: "success",

      ...(message ? { message } : {}),
      ...(data && { data }),
    },
    { status: statusCode },
  );
}

export function handleErrorResponse({
  statusCode,
  message,
  details,
}: HandleErrorResponse) {
  return Response.json(
    {
      statusCode,
      message,
      status: statusCode < 500 ? "fail" : "error",
      ...(details && { details }),
    },
    { status: statusCode },
  );
}
