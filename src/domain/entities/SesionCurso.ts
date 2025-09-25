export interface SesionCurso {
  id: string; // PK, Guid
  nombre: string;
  descripcion?: string;
  avatar?: string;
  videoUrl?: string;
  lecturaUrl?: string;
  cursoId: string; // FK, Guid
  duracionLectura?: number; // Decimal
  duracionVideo?: number; // Decimal
  instruccional?: string;
  estado: boolean;
  fechaRegistro: Date;
}