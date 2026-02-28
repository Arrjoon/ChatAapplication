// AUTH ROUTES
export const LOGIN = "accounts/login/";
export const REFRESH_TOKEN = "accounts/token/refresh/";
export const LOGOUT = "accounts/logout/";
export const REGISTER = "accounts/register/";
// export const RESET_PASSWORD = "auth/reset-password/";
// export const FORGET_PASSWORD = "auth/forgot-password/";
export const CHANGE_PASSWORD = "accounts/change-password/";
export const FETCH_CSRF_TOKEN = "accounts/get-csrftoken/";

export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || "http://localhost:3000";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/";

// USER
export const USER_PROFILE = "/accounts/me";
export const USER_PROFILE_UPDATE = "/accounts/me/";

// MEDIA MANAGER
export const MEDIA_LIST = "media_manager/media/";
export const MEDIA_DETAIL = (id: number) => `media_manager/media/${id}/`;
export const MEDIA_BY_FOLDER = "media_manager/media/by_folder/";
export const MEDIA_BY_TAG = "media_manager/media/by_tag/";
export const MEDIA_BY_TYPE = "media_manager/media/by_type/";
export const MEDIA_STATS = "media_manager/media/stats/";
export const MEDIA_ADD_TAGS = (id: number) => `media_manager/media/${id}/add_tags/`;
export const MEDIA_REMOVE_TAGS = (id: number) => `media_manager/media/${id}/remove_tags/`;
export const MEDIA_MOVE_TO_FOLDER = (id: number) => `media_manager/media/${id}/move_to_folder/`;

export const FOLDER_LIST = "media_manager/folders/";
export const FOLDER_DETAIL = (id: number) => `media_manager/folders/${id}/`;
export const FOLDER_TREE = "media_manager/folders/tree/";
export const FOLDER_CHILDREN = (id: number) => `media_manager/folders/${id}/children/`;
export const FOLDER_MEDIA = (id: number) => `media_manager/folders/${id}/media/`;

export const TAG_LIST = "media_manager/tags/";
export const TAG_DETAIL = (id: number) => `media_manager/tags/${id}/`;
export const TAG_MEDIA_COUNT = (id: number) => `media_manager/tags/${id}/media_count/`;

export const MEDIA_SEARCH = "media_manager/search/";
export const MEDIA_ADVANCED_SEARCH = "media_manager/search/advanced/";

