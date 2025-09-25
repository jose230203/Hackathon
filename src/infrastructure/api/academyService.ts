import { api } from "@/shared/utils/api";
import type { Academia } from "@/domain/entities/Academia";
import type { Curso } from "@/domain/entities/Curso";
import type { SesionCurso } from "@/domain/entities/SesionCurso";

// Helpers de mapeo desde API (PascalCase) a dominio (camelCase)
function mapAcademia(a: any): Academia {
  return {
    id: a.Id ?? a.id,
    nombre: a.Nombre ?? a.nombre,
    descripcion: a.Descripcion ?? a.descripcion,
    avatar: a.Avatar ?? a.avatar,
    tipoAcademia: a.TipoAcademia ?? a.tipoAcademia,
    dificultad: a.Dificultad ?? a.dificultad,
    estado: (a.Estado ?? a.estado) ?? true,
    fechaRegistro: a.FechaRegistro ? new Date(a.FechaRegistro) : new Date(),
  } as Academia;
}

function mapCurso(c: any): Curso {
  return {
    id: c.Id ?? c.id,
    nombre: c.Nombre ?? c.nombre,
    descripcion: c.Descripcion ?? c.descripcion,
    avatar: c.Avatar ?? c.avatar,
    videoUrl: c.VideoURL ?? c.videoUrl,
    academiaId: c.AcademiaId ?? c.academiaId,
    dificultad: (c.Dificultad ?? c.dificultad) ?? "Intermedio",
    instruccional: c.Instruccional ?? c.instruccional,
    estado: (c.Estado ?? c.estado) ?? true,
    fechaRegistro: c.FechaRegistro ? new Date(c.FechaRegistro) : new Date(),
  } as Curso;
}

function mapSesion(s: any): SesionCurso {
  return {
    id: s.Id ?? s.id,
    nombre: s.Nombre ?? s.nombre,
    descripcion: s.Descripcion ?? s.descripcion,
    avatar: s.Avatar ?? s.avatar,
    videoUrl: s.VideoURL ?? s.videoUrl,
    lecturaUrl: s.LecturaURL ?? s.lecturaUrl,
    cursoId: s.CursoId ?? s.cursoId,
    duracionLectura: s.DuracionLectura ?? s.duracionLectura,
    duracionVideo: s.DuracionVideo ?? s.duracionVideo,
    instruccional: s.Instruccional ?? s.instruccional,
    estado: (s.Estado ?? s.estado) ?? true,
    fechaRegistro: s.FechaRegistro ? new Date(s.FechaRegistro) : new Date(),
  } as SesionCurso;
}

export async function getListAcademy(): Promise<Academia[]> {
  const { data } = await api.get("/Academia/getListAcademy");
  return (data ?? []).map(mapAcademia);
}

export async function getListLastCursos(): Promise<Curso[]> {
  const { data } = await api.get("/Academia/getListLastCursos");
  return (data ?? []).map(mapCurso);
}

export async function getListCursosVistosRecientes(): Promise<any[]> {
  const { data } = await api.get("/Academia/getListCursosVistosRecientes");
  return data ?? [];
}

export async function getAcademyByAcademiaId(academiaId: string): Promise<Academia> {
  const { data } = await api.get(`/Academia/getAcademyByAcademiaId/${academiaId}`);
  return mapAcademia(data);
}

export async function getListCursoByAcademiaId(academiaId: string): Promise<Curso[]> {
  const { data } = await api.get(`/Academia/getListCursoByAcademiaId/${academiaId}`);
  return (data ?? []).map(mapCurso);
}

export async function getProgresoByAcademiaId(academiaId: string): Promise<any> {
  const { data } = await api.get(`/Academia/getProgresoByAcademiaId/${academiaId}`);
  return data;
}

export async function getCursoByCursoId(cursoId: string): Promise<Curso> {
  const { data } = await api.get(`/Academia/getCursoByCursoId/${cursoId}`);
  return mapCurso(data);
}

export async function getListSesionCursoByCursoId(cursoId: string): Promise<SesionCurso[]> {
  const { data } = await api.get(`/Academia/getListSesionCursoByCursoId/${cursoId}`);
  return (data ?? []).map(mapSesion);
}

export async function getProgresoByCursoId(cursoId: string): Promise<any> {
  const { data } = await api.get(`/Academia/getProgresoByCursoId/${cursoId}`);
  return data;
}
