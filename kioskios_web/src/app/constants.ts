import { User } from "./models/user";

export const TYPE_FORMS = {
  CREATE_USER: "create_user",
  CREATE_OWNER: "create_owner",
  CREATE_STORE: "create_shop",
  CREATE_PRODUCT: "create_product",
  CREATE_VENTA: "create_sale",
  LOGIN: "login",
  GET_PRODUCTS: "get_products"
};

export const MODEL_URL = {
  PRODUCTO: 'get_products',
  VENTA: 'get_sales',
  TIENDAS: 'get_shops'
}

export const EMPTY_USER = {} as User;