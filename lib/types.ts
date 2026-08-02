// success Status
export type ApiResponseSuccess<T> = {
    statusCode: number;
    status: "success";
    message?: string;
    data: T;
};


// Erorr Status
export type ApiResponseError = {
    statusCode: number;
    status: "fail" | "error";
    message: string;
    details?: Record<string, unknown> | null;
};

// Conmpier To Erorr And Sucsess Status 
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

export type HandleSuccessResponseInput<T> = {
    statusCode?: number;
    message?: string;
    data: T;
};

export type HandleErrorResponseInput = {
    statusCode: number;
    message: string;
    details?: Record<string, unknown> | null;
};