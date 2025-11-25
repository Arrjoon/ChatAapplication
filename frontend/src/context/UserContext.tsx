"use client";
import { userprofileresponse } from "@/api-services/user/user-api-definations";
import { UserServices } from "@/api-services/user/user-api-services";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext } from "react";

const userServices = new UserServices();


interface UserContextType {
    user: userprofileresponse | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
}
const userContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const {data,isLoading,isError,refetch} =useQuery({
        queryKey:['user-profile'],
        queryFn: () => userServices.fetchUserProfile(),
    });

    return (

        <userContext.Provider value={{user: data,isLoading,isError,refetch}}>
            {children}
        </userContext.Provider>
    );
}
export const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
    };