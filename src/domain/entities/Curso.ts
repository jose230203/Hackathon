export interface Curso {
  id: string; // PK, Guid
  nombre: string;
  descripcion: string;
  avatar: string;
  videoUrl: string;
  academiaId: string; // FK, Guid
  dificultad: string; // EnumDificultad
  estado: boolean;
  fechaRegistro: Date;
}