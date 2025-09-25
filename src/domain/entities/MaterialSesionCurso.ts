export enum TipoMaterial {
  Documento = "Documento",
  Prueba = "Prueba",
  Examen = "Examen",
  Laboratorio = "Laboratorio",
}

export interface MaterialSesionCurso {
  id: string; // PK, Guid
  identificadorManual?: string;
  sesionCursoId: string; // FK, Guid
  nombre: string;
  avance?: number; // Decimal
  avatar?: string;
  archivoUrl?: string;
  tipoMaterial: TipoMaterial;
  instruccional?: string;
  estado: boolean;
  fechaRegistro: Date;
}