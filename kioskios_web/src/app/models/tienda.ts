import { User } from "./user";

export interface Tienda {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  qr?: string;
  latitud: number;
  longitud: number;
}
