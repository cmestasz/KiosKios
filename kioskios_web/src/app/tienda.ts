import { User } from "./models/user";

export interface Tienda {
  nombre: string;
  descripción: string;
  categoria: string;
  dueño: User;
  // latitud: number;
  // longitud: number;
}
