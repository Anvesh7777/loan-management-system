import api from "@/lib/axios";
import {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export const loginUser = (
  data: LoginPayload
) => api.post("/auth/login", data);

export const registerUser = (
  data: RegisterPayload
) => api.post("/auth/register", data);