import { api } from "@/libs/api";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { IAuthProps } from "../auth";
import { LoginSchemaType } from "../auth-validation";
import { useAuthStore } from "@/store/auth-store";

const login = async ({
  data
} : {
  data: LoginSchemaType
}): Promise<IAuthProps> => {
  const response = await api.post<IAuthProps>("auth/login", { 
    username: data.username,
    password: data.password,
    expiresInMins: 30, // optional, defaults to 60
  });
  
  return response.data;
}

const useLogin = () => {
  const navigate = useNavigate();
  const setCreds = useAuthStore((state) => state.setCreds);

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { accessToken, ...user } = res;
      setCreds(user, accessToken);
      navigate("/admin", { replace: true });
    },
  });
}

export { login, useLogin };