import { Producto } from "./product";
import { Tienda } from "./tienda";
import { User } from "./user";

export interface Venta {
  id?: number;
  usuario: User;
  fecha?: Date;
  producto: Producto;
  confirmed?: boolean;
  cantidad: number;
  tiendaId?: number;
}
