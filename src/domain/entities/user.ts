export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  avatar: string;
  contrasena: string;
  estado: boolean;
  fechaRegistro: Date;
}