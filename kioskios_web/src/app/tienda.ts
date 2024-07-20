import { User } from "./models/user";

export interface Tienda {
  id: number;
  nombre: string;
  descripción: string;
  categoria: string;
  dueño: User;
  // latitud: number;
  // longitud: number;
}
