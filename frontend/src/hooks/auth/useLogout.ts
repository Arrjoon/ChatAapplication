"use client";
import { apiClient } from "@/api/api-client";
import { LOGOUT } from "@/lib/end-points";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogout = () => {
  // Placeholder for logout functionality

  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post(LOGOUT);
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/sign-in");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    }
  });
}