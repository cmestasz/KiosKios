import { User } from "./user";

export interface Venta {
  usuario: User;
  fecha: Date;
  producto: string;
  confirmed: boolean;
  cantidad: number;
}
