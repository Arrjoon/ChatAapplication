// Import axios and required types
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

// Mutex prevents multiple refreshToken() calls at the same time
import { Mutex } from "async-mutex";

// API endpoints
import {
  BASE_URL,
  FETCH_CSRF_TOKEN,
  LOGOUT,
  REFRESH_TOKEN,
} from "@/lib/end-points";

const LOGIN_URL = "/sign-in"; // Login page
const API_BASE_URL = BASE_URL; // Base URL for API server

/*
  ===========================================================
  ApiClient Class
  - Uses Singleton pattern (only ONE instance exists)
  - Handles:
      ✔ axios instance
      ✔ CSRF token
      ✔ Refresh tokens
      ✔ Auto redirect on 401/403/404
      ✔ Attaches cookies to request
  ===========================================================
*/
export class ApiClient {
  private static instance: ApiClient; // Holds single instance
  private axiosInstance: AxiosInstance; // Actual axios client
  private mutex = new Mutex(); // Prevents multiple refresh calls

  // Private constructor → Singleton (cannot create more instances)
  private constructor() {
    // Create axios instance with default settings
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL, // API URL
      headers: {
        "Content-Type": "application/json",       // Sending JSON
        "X-Requested-With": "XMLHttpRequest",     // Mark request as AJAX
      },
      withCredentials: true, // Send cookies along with requests
    });

    // Initialize request + response interceptors
    this.initializeInterceptors();
  }

  // Singleton getter
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(); // Create instance only once
    }
    return ApiClient.instance;
  }

  /*
    ===========================================================
    Interceptors
    - Request Interceptor:
         ✔ Add CSRF token
         ✔ Auto-fetch new CSRF token before unsafe requests
    - Response Interceptor:
         ✔ Redirect on 403/404
         ✔ Auto refresh access token on 401
    ===========================================================
  */
  private initializeInterceptors() {
    // -----------------------------
    // REQUEST INTERCEPTOR
    // -----------------------------
    this.axiosInstance.interceptors.request.use(async (config) => {
      // Helper function to read cookies in browser
      function getCookie(name: string): string | null {
        if (typeof window === "undefined") return null;
        const cookies = document.cookie.split("; ");

        for (const cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) return decodeURIComponent(value);
        }
        return null;
      }

      const method = config.method?.toUpperCase();
      const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];

      /*
        CSRF Protection:
        - If request is NOT safe (POST/PUT/PATCH/DELETE),
        - Fetch new CSRF token from server
      */
      // if (method && !safeMethods.includes(method)) {
      //   try {
      //     await this.axiosInstance.get(FETCH_CSRF_TOKEN);
      //   } catch (e) {
      //     console.error("Failed to fetch CSRF token", e);
      //   }
      // }

      // // Add CSRF token to header
      // const csrfToken = getCookie("csrftoken");

      // if (csrfToken) {
      //   config.headers = config.headers || {};
      //   config.headers["X-CSRFToken"] = csrfToken;
      // }

      return config;
    });

    // -----------------------------
    // RESPONSE INTERCEPTOR
    // -----------------------------
    this.axiosInstance.interceptors.response.use(
      (response) => response,

      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // 404 → redirect to /not-found
        if (error.response?.status === 404) {
          window.location.href = "/not-found";
          return Promise.reject(error);
        }

        // 403 → redirect to /forbidden
        if (error.response?.status === 403) {
          window.location.href = "/forbidden";
          return Promise.reject(error);
        }

        /*
          =======================================================
          401 Unauthorized Handling
          - Means token expired or invalid
          - Refresh token → get new access token
          - Retry original request
          =======================================================
        */
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Prevent multiple refreshToken() calls
          return this.mutex.runExclusive(async () => {
            try {
              await this.refreshToken(); // Get new access token
              return this.axiosInstance(originalRequest); // Retry request
            } catch (refreshError) {
              // If refresh fails → redirect to login
              if (window.location.pathname !== LOGIN_URL) {
                window.location.href = LOGIN_URL;
              }
              return Promise.reject(refreshError);
            }
          });
        }

        return Promise.reject(error);
      }
    );
  }

  /*
    ===========================================================
    refreshToken()
    - Calls BACKEND to refresh access token using refresh cookie
    ===========================================================
  */
  public async refreshToken() {
    try {
      await this.axiosInstance.post(
        REFRESH_TOKEN,
        {},
        { _retry: true } as InternalAxiosRequestConfig & { _retry?: boolean }
      );
    } catch (error) {
      // If refresh fails → logout user from backend
      await this.axiosInstance.post(LOGOUT);
      throw error;
    }
  }

  // Returns axios instance
  public get client(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export globally usable client
export const apiClient = ApiClient.getInstance().client;
