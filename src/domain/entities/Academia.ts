export enum TipoAcademia {
  Academia = "Academia",
  Laboratorio = "Laboratorio",
}

export enum Dificultad {
  Novato = "Novato",
  Intermedio = "Intermedio",
  Avanzado = "Avanzado",
}

export interface Academia {
  id: string; // PK, Guid
  nombre: string;
  descripcion?: string;
  avatar?: string;
  tipoAcademia: TipoAcademia;
  dificultad: Dificultad;
  estado: boolean;
  fechaRegistro: Date;
}