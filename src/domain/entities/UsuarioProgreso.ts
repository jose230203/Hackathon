export interface UsuarioProgreso {
  id: string; // PK, Guid
  usuarioId: string; // FK, Guid
  puntos: number; // Decimal
  racha: number;
  retosCompletados: number;
  estado: boolean;
  fechaInicio: Date;
}
