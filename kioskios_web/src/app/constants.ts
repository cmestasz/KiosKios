import { User } from "./models/user";

export const TYPE_FORMS = {
  CREATE_USER: "crear_usuario",
  CREATE_OWNER: "crear_dueño",
  CREATE_STORE: "crear_tienda",
  CREATE_PRODUCT: "crear_producto",
  CREATE_VENTA: "crear_venta",
  LOGIN: "iniciar_sesion",
  GET_PRODUCTS: "get_productos"
};

export type CategoryKey = 'BEB' | 'LIB' | 'SNA' | 'IMP' | 'ELE' | 'ASE' | 'OTR';

export const CATEGORY: {[key in CategoryKey]: string} = {
  BEB: 'Bebidas',
  LIB: 'Librería',
  SNA: 'Snacks',
  IMP: 'Impresiones',
  ELE: 'Electrónicos',
  ASE: 'Aseo',
  OTR: 'Otros',
}

export const EMPTY_USER = {} as User;