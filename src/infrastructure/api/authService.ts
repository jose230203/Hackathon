import { api } from "@/shared/utils/api";

export type RegisterPayload = {
  nombre: string;
  correo: string;
  contrasena: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload) {
  const { data } = await api.post("/usuario/create", payload);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<{ token?: string; [k: string]: any }> {
  const { data } = await api.post("/usuario/login", payload);
  // Intentar normalizar token desde diferentes formas
  const token = data?.token || data?.access_token || data?.accessToken || data?.session?.access_token || data?.session?.accessToken;
  return { token, ...data };
}

export async function deleteUserByEmail(email: string) {
  const { data } = await api.post("/usuario/delete", { email });
  return data;
}

export async function getProfile(token: string) {
  const { data } = await api.get(`/usuario/profile`, { params: { token } });
  return data;
}
