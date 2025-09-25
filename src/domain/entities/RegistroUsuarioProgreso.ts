export interface RegistroUsuarioProgreso {
  id: string; // PK, Guid
  usuarioProgresoId: string; // FK, Guid
  punto: number; // Decimal
  racha: number;
  retosCompletados: number;
  estado: boolean;
  fecha: Date;
}
