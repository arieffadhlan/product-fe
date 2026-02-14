import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  errors?: string | string[];
  error?: string;
}

interface ErrorDetail {
  message: string;
  type: ErrorType;
  statusCode?: number;
  originalError?: unknown;
}

type ErrorType = "validation" | "authentication" | "authorization" | "not_found" | "server" | "network" | "unknown";

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input",
  401: "Session expired. Please login again",
  403: "You don't have permission to perform this action",
  404: "The requested resource was not found",
  409: "This resource already exists",
  422: "Validation failed. Please check your input",
  429: "Too many requests. Please try again later",
  500: "Server error. Please try again later",
  502: "Server is temporarily unavailable",
  503: "Service is currently unavailable",
};

const NETWORK_ERROR_KEYWORDS = ["network", "timeout", "econnrefused", "enotfound"];

function extractFromApiResponse(data: ApiErrorResponse): string | null {
  if (data.message) return data.message;
  if (data.error) return data.error;

  if (data.errors) {
    if (Array.isArray(data.errors)) {
      return data.errors[0] || null;
    }
    if (typeof data.errors === "string") {
      return data.errors;
    }
  }

  return null;
}

function getErrorType(error: AxiosError): ErrorType {
  const status = error.response?.status;

  if (!status) {
    const isNetworkError = NETWORK_ERROR_KEYWORDS.some((keyword) => error.message.toLowerCase().includes(keyword));
    return isNetworkError ? "network" : "unknown";
  }

  if (status === 401) return "authentication";
  if (status === 403) return "authorization";
  if (status === 404) return "not_found";
  if (status === 422 || status === 400) return "validation";
  if (status >= 500) return "server";

  return "unknown";
}

function getStatusMessage(status?: number): string | null {
  return status ? HTTP_ERROR_MESSAGES[status] || null : null;
}

export function getErrorMessage(error: unknown): string {
  const detail = getErrorDetail(error);
  return detail.message;
}

export function getErrorDetail(error: unknown): ErrorDetail {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const type = getErrorType(error);

    const apiData = error.response?.data as ApiErrorResponse | undefined;
    if (apiData) {
      const apiMessage = extractFromApiResponse(apiData);
      if (apiMessage) {
        return { message: apiMessage, type, statusCode: status, originalError: error };
      }
    }

    const statusMessage = getStatusMessage(status);
    if (statusMessage) {
      return { message: statusMessage, type, statusCode: status, originalError: error };
    }

    const fallbackMessage = error.message || error.response?.statusText;
    if (fallbackMessage) {
      return { message: fallbackMessage, type, statusCode: status, originalError: error };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      type: "unknown",
      originalError: error,
    };
  }

  if (typeof error === "string") {
    return { message: error, type: "unknown", originalError: error };
  }

  if (error && typeof error === "object" && "message" in error) {
    return {
      message: String(error.message),
      type: "unknown",
      originalError: error,
    };
  }

  return {
    message: "An unexpected error occurred",
    type: "unknown",
    originalError: error,
  };
}

export function isErrorType(error: unknown, type: ErrorType): boolean {
  const detail = getErrorDetail(error);
  return detail.type === type;
}

export function isAuthError(error: unknown): boolean {
  return isErrorType(error, "authentication");
}
