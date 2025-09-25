import { api } from "@/shared/utils/api";
import type { UsuarioProgreso } from "@/domain/entities/UsuarioProgreso";

// Mappers para compatibilidad PascalCase <-/-> camelCase
function mapUsuarioProgreso(p: any): UsuarioProgreso {
  return {
    id: p.Id ?? p.id ?? "",
    usuarioId: p.UsuarioId ?? p.usuarioId ?? "",
    puntos: p.Punto ?? p.puntos ?? 0,
    racha: p.Racha ?? p.racha ?? 0,
    retosCompletados: p.Reto ?? p.retosCompletados ?? 0,
    estado: (p.Estado ?? p.estado) ?? true,
    fechaInicio: p.FechaInicio ? new Date(p.FechaInicio) : new Date(),
  };
}

export async function getUsuarioProgreso(): Promise<UsuarioProgreso> {
  const { data } = await api.get("/UsuarioProgreso/getUsuarioProrgeso");
  return mapUsuarioProgreso(data);
}

export async function postRegistroUsuarioProgresoDay(payload: {
  punto: number;
  racha: number;
  reto: number;
}): Promise<UsuarioProgreso> {
  const { data } = await api.post("/UsuarioProgreso/postRegistroUsuarioProgresoDay", payload);
  return mapUsuarioProgreso(data);
}

export async function getTopFiveUsuarioProgreso(): Promise<UsuarioProgreso[]> {
  const { data } = await api.get("/UsuarioProgreso/getListUsuarioProgresoTopFive");
  return (data ?? []).map(mapUsuarioProgreso);
}
