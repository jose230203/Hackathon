export interface InscripcionUsuario {
  id: string; // PK, Guid
  usuarioId: string; // FK, Guid
  cursoId?: string; // FK, Guid, Allow null
  sesionCursoId?: string; // FK, Guid, Allow null
  materialSesionCursoId?: string; // FK, Guid, Allow null
  avance?: number; // Decimal
  estado: boolean;
  fechaRegistro: Date;
}