import { api } from "@/shared/utils/api";

export type RegisterPayload = {
  nombre: string;
  correo: string; // email del usuario
  contrasena: string; // password del usuario
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload) {
  const body = {
    nombre: payload.nombre,
    correo: payload.correo,
    contrasena: payload.contrasena,
  };
  // Permitimos sobreescribir el path por ENV para entornos donde difiere
  const REGISTER_PATH = process.env.NEXT_PUBLIC_REGISTER_PATH || "/usuario/create";
  try {
    const { data } = await api.post(REGISTER_PATH, body);
    return data;
  } catch (err: unknown) {
    if (typeof window !== "undefined") {
      console.warn("Registro falló en:", (api.defaults.baseURL || "") + REGISTER_PATH, err);
    }
    // Intento de fallback opcional si existe otra ruta en algún entorno
    try {
      const { data } = await api.post("/usuario/create", body);
      return data;
    } catch (err2: unknown) {
      type ApiError = { response?: { data?: { message?: string; error?: string } } ; message?: string };
      const e = (err2 || err) as ApiError;
      const serverMsg = e?.response?.data?.message || e?.response?.data?.error || e?.message;
      throw new Error(serverMsg || "No se pudo registrar el usuario");
    }
  }
}

export async function loginUser(payload: LoginPayload): Promise<{ token?: string } & Record<string, unknown>> {
  const { data } = await api.post("/Usuario/Login", payload);
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
