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

export async function loginUser(payload: LoginPayload): Promise<{ token?: string } & Record<string, unknown>> {
  const { data } = await api.post("/usuario/login", payload);
  // Intentar normalizar token desde diferentes formas
  const token = data?.token || data?.access_token || data?.accessToken || data?.session?.access_token || data?.session?.accessToken;
  return { token, ...data };
}

export async function deleteUserByEmail(email: string) {
  const { data } = await api.post("/usuario/delete", { email });
  return data;
}

export async function getProfile(token?: string) {
  // El token se envía por Authorization header via interceptor.
  // Además, para compatibilidad con backends previos, si se provee token lo enviamos también como query param.
  const url = token ? `/usuario/profile?token=${encodeURIComponent(token)}` : `/usuario/profile`;
  const { data } = await api.get(url);
  return data;
}
