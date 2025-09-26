import { api } from "@/shared/utils/api";
import type { UsuarioProgreso } from "@/domain/entities/UsuarioProgreso";

// Mappers para compatibilidad PascalCase <-/-> camelCase
type RawUsuarioProgreso = Partial<{
  Id: string; id: string;
  UsuarioId: string; usuarioId: string;
  Punto: number; puntos: number;
  Racha: number; racha: number;
  Reto: number; retosCompletados: number;
  Estado: boolean; estado: boolean;
  FechaInicio: string | Date;
}>;

function mapUsuarioProgreso(p: RawUsuarioProgreso): UsuarioProgreso {
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
