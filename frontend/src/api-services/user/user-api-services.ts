import { FETCH_USER_PROFILE, FETCH_USERS } from "@/lib/end-points";
import { IUserServices, userprofileresponse } from "./user-api-definations";
import { apiClient } from "@/api/api-client";

class UserServices implements IUserServices {
    async fetchUserProfile(): Promise<userprofileresponse> {
        const response = await apiClient.get(FETCH_USER_PROFILE);
        return response.data;
    }
    async fetchUsers(): Promise<userprofileresponse[]> {
        const response = await apiClient.get(FETCH_USERS);
        return response.data;
    }     
}
export default new UserServices();