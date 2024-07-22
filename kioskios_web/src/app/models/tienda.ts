import { User } from "./user";

export interface Tienda {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  dueno: User;
  // latitud: number;
  // longitud: number;
}
