import { SafeUrl } from "@angular/platform-browser";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string | SafeUrl;
  tienda: string;
}