// AUTH ROUTES
export const LOGIN = "auth/login/";
export const REFRESH_TOKEN = "auth/token/refresh/";
export const VERIFY_TOKEN = "auth/token/verify/";
export const LOGOUT = "auth/logout/";
export const RESET_PASSWORD = "auth/reset-password/";
export const FORGET_PASSWORD = "auth/forgot-password/";
export const CHANGE_PASSWORD = "auth/change-password/";
export const FETCH_CSRF_TOKEN = "auth/get-csrftoken/";


export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || "http://localhost:3000";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/";


export const FETCH_CHAT_ROOMS_LIST = "chat/rooms/";
export const CREATE_GROUP_CHAT = "chat/api/rooms/";
export const FETCH_CHAT_ROOM_DETAILS = (roomId: number) =>
  `chat/rooms/${roomId}/`;  


//user profile
export const FETCH_USER_PROFILE = "auth/profile/";
export const UPDATE_USER_PROFILE = "auth/profile/update/";