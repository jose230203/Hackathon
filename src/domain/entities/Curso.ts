import { Dificultad } from "./Academia";

export interface Curso {
  id: string; // PK, Guid
  nombre: string;
  descripcion?: string;
  avatar?: string;
  videoUrl?: string; // VideoURL opcional
  academiaId: string; // FK, Guid
  dificultad: Dificultad; // EnumDificultad
  instruccional?: string;
  estado: boolean;
  fechaRegistro: Date;
}