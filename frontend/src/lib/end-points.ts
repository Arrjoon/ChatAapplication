// AUTH ROUTES
export const LOGIN = "auth/login/";
export const VERIFY_TOKEN = "auth/login/verify/";
export const REFRESH_TOKEN = "auth/login/refresh/";
export const LOGOUT = "auth/logout/";
export const RESET_PASSWORD = "auth/reset-password/";
export const FORGET_PASSWORD = "auth/forgot-password/";
export const CHANGE_PASSWORD = "auth/change-password/";
export const FETCH_CSRF_TOKEN = "auth/get-csrftoken/";

export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || "http://localhost:3000";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1/";
