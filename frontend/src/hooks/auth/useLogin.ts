import { useMutation } from "@tanstack/react-query";

import { LOGIN } from "@/lib/end-points";
import { apiClient } from "@/api/api-client";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) =>
      apiClient.post(LOGIN, credentials),
  });
};
