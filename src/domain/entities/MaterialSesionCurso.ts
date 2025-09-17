export interface MaterialSesionCurso {
  id: string; // PK, Guid
  identificadorManual: string;
  sesionCursoId: string; // FK, Guid
  nombre: string;
  descripcion: string;
  avatar: string;
  archivoUrl: string;
  instruccion: string;
  estado: boolean;
  fechaRegistro: Date;
}