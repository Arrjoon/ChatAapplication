import { userprofileresponse } from "@/api-services/user/user-api-definations";
import UserServices from "@/api-services/user/user-api-services";
import { useQuery } from "@tanstack/react-query";


export const USER_LIST_QUERY_KEY = 'userList';



export const useFetchUserList = () => {
    return useQuery<userprofileresponse[]>({
        queryKey :[USER_LIST_QUERY_KEY],
        queryFn:() => UserServices.fetchUsers(),
    }
    );
}