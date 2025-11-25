import { FETCH_USER_PROFILE } from "@/lib/end-points";
import { IUserServices, userprofileresponse } from "./user-api-definations";
import { apiClient } from "@/api/api-client";

class UserServices implements IUserServices {
    async fetchUserProfile(): Promise<userprofileresponse> {
        const response = await apiClient.get(FETCH_USER_PROFILE);
        return response.data;
    }        
}
export { UserServices };