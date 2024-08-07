import { User } from "./models/user";
import { Venta } from "./models/venta";

export const TYPE_FORMS = {
  CREATE_USER: "create_user",
  CREATE_OWNER: "create_owner",
  CREATE_SHOP: "create_shop",
  CREATE_PRODUCT: "create_product",
  CREATE_VENTA: "create_sale",
  LOGIN: "login",
  GET_PRODUCTS: "get_products"
};

export const MODEL_URL = {
  PRODUCTO: 'get_products',
  VENTA: 'get_sales',
  TIENDAS: 'get_shops',
}
export type CategoryKey = 'BEB' | 'LIB' | 'SNA' | 'IMP' | 'ELE' | 'ASE' | 'COM' | 'OTR';

export const CATEGORY: {[key in CategoryKey]: string} = {
  BEB: 'Bebidas',
  LIB: 'Librería',
  SNA: 'Snacks',
  COM: 'Comida',
  IMP: 'Impresiones',
  ELE: 'Electrónicos',
  ASE: 'Aseo',
  OTR: 'Otros',
}

export const EMPTY_USER = {} as User;
export const EMPTY_SALE = {} as Venta;