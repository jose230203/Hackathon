import { api } from "@/shared/utils/api";
import { Dificultad, type Academia } from "@/domain/entities/Academia";
import type { Curso } from "@/domain/entities/Curso";
import type { SesionCurso } from "@/domain/entities/SesionCurso";

// Helpers de mapeo desde API (PascalCase) a dominio (camelCase)
type RawAcademia = Partial<{
  Id: string; id: string;
  Nombre: string; nombre: string;
  Descripcion: string; descripcion: string;
  Avatar: string; avatar: string;
  TipoAcademia: string; tipoAcademia: string;
  Dificultad: Dificultad; dificultad: Dificultad;
  Estado: boolean; estado: boolean;
  FechaRegistro: string | Date;
}>;

function mapAcademia(a: RawAcademia): Academia {
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

type RawCurso = Partial<{
  Id: string; id: string;
  Nombre: string; nombre: string;
  Descripcion: string; descripcion: string;
  Avatar: string; avatar: string;
  VideoURL: string; videoUrl: string;
  AcademiaId: string; academiaId: string;
  Dificultad: Dificultad; dificultad: Dificultad;
  Instruccional: string; instruccional: string;
  Estado: boolean; estado: boolean;
  FechaRegistro: string | Date;
}>;

function mapCurso(c: RawCurso): Curso {
  return {
    id: c.Id ?? c.id,
    nombre: c.Nombre ?? c.nombre,
    descripcion: c.Descripcion ?? c.descripcion,
    avatar: c.Avatar ?? c.avatar,
    videoUrl: c.VideoURL ?? c.videoUrl,
    academiaId: c.AcademiaId ?? c.academiaId,
  dificultad: (c.Dificultad ?? c.dificultad) ?? Dificultad.Intermedio,
    instruccional: c.Instruccional ?? c.instruccional,
    estado: (c.Estado ?? c.estado) ?? true,
    fechaRegistro: c.FechaRegistro ? new Date(c.FechaRegistro) : new Date(),
  } as Curso;
}

type RawSesion = Partial<{
  Id: string; id: string;
  Nombre: string; nombre: string;
  Descripcion: string; descripcion: string;
  Avatar: string; avatar: string;
  VideoURL: string; videoUrl: string;
  LecturaURL: string; lecturaUrl: string;
  CursoId: string; cursoId: string;
  DuracionLectura: number; duracionLectura: number;
  DuracionVideo: number; duracionVideo: number;
  Instruccional: string; instruccional: string;
  Estado: boolean; estado: boolean;
  FechaRegistro: string | Date;
}>;

function mapSesion(s: RawSesion): SesionCurso {
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

export type CursoVistoReciente = {
  id: string;
  nombre: string;
  avatar?: string;
  fechaRegistro: Date;
};

export async function getListCursosVistosRecientes(): Promise<CursoVistoReciente[]> {
  const { data } = await api.get("/Academia/getListCursosVistosRecientes");
  const arr = (data ?? []) as Array<Partial<{ Id: string; id: string; Nombre: string; nombre: string; Avatar?: string; avatar?: string; FechaRegistro?: string }>>;
  return arr.map((c) => ({
    id: c.Id ?? c.id ?? "",
    nombre: c.Nombre ?? c.nombre ?? "",
    avatar: c.Avatar ?? c.avatar,
    fechaRegistro: c.FechaRegistro ? new Date(c.FechaRegistro) : new Date(),
  }));
}

export async function getAcademyByAcademiaId(academiaId: string): Promise<Academia> {
  const { data } = await api.get(`/Academia/getAcademyByAcademiaId/${academiaId}`);
  return mapAcademia(data);
}

export async function getListCursoByAcademiaId(academiaId: string): Promise<Curso[]> {
  const { data } = await api.get(`/Academia/getListCursoByAcademiaId/${academiaId}`);
  return (data ?? []).map(mapCurso);
}

export type ProgresoAcademia = { porcentaje: number; retos: number; puntos: number };
export async function getProgresoByAcademiaId(academiaId: string): Promise<ProgresoAcademia> {
  const { data } = await api.get(`/Academia/getProgresoByAcademiaId/${academiaId}`);
  const d = data as Partial<{ Porcentaje: number; porcentaje: number; Retos: number; retos: number; Puntos: number; puntos: number }>;
  return {
    porcentaje: d.Porcentaje ?? d.porcentaje ?? 0,
    retos: d.Retos ?? d.retos ?? 0,
    puntos: d.Puntos ?? d.puntos ?? 0,
  };
}

export async function getCursoByCursoId(cursoId: string): Promise<Curso> {
  const { data } = await api.get(`/Academia/getCursoByCursoId/${cursoId}`);
  return mapCurso(data);
}

export async function getListSesionCursoByCursoId(cursoId: string): Promise<SesionCurso[]> {
  const { data } = await api.get(`/Academia/getListSesionCursoByCursoId/${cursoId}`);
  return (data ?? []).map(mapSesion);
}

export type ProgresoCurso = { porcentaje: number; retos: number; puntos: number };
export async function getProgresoByCursoId(cursoId: string): Promise<ProgresoCurso> {
  const { data } = await api.get(`/Academia/getProgresoByCursoId/${cursoId}`);
  const d = data as Partial<{ Porcentaje: number; porcentaje: number; Retos: number; retos: number; Puntos: number; puntos: number }>;
  return {
    porcentaje: d.Porcentaje ?? d.porcentaje ?? 0,
    retos: d.Retos ?? d.retos ?? 0,
    puntos: d.Puntos ?? d.puntos ?? 0,
  };
}
