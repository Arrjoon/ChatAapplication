import { apiClient } from "@/api/api-client";
import { LOGIN, LOGOUT, REGISTER } from "@/lib/end-points";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./user-definations";





export const login = async (payload:LoginPayload):Promise<LoginResponse> => {
    const response = await apiClient.post(LOGIN, payload);
    return response.data;
}

export const logout = async ():Promise<void> => {
    await apiClient.post(LOGOUT);
}

export const register = async (payload:RegisterPayload):Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(REGISTER, payload);
    return response.data;
}