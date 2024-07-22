import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { Producto } from '../models/product';
import { User } from '../models/user';
import { EMPTY_USER } from '../constants';
import { Tienda } from '../models/tienda';
import { Venta } from '../models/venta';
import { Response } from '../models/response';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBaseApi: string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  putSale(sale: Venta): Observable<Response> {
    const url = this.urlBaseApi + '/create_sale/';
    return this.http
      .put<Response>(url, {token: localStorage.getItem('token'), producto: sale.producto.id, cantidad: sale.cantidad})
      .pipe(
        map((response) => {
          if (response.status == 401) {
            console.log("Ha ocurrido un error en la respuesta: ", response);
            throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("He capturado un error en la respuesta: ", error);
          throw error;
        })
      )
  }

  getQrByShop(id: number): Observable<string> {
    const url = this.urlBaseApi + '/get_qr_by_shop/';
    return this.http
      .post<{ status: number; qr: string }>(url, {token: localStorage.getItem('token'), id})
      .pipe(
        map((response) => {
          if (response.status != 200) {
            console.log("Ha ocurrido un error en la respuesta: ", response);
            throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          }
          console.log("Enviando qr: ", response)
          return response.qr;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Ha ocurrido un error en la respuesta: ", error);
          throw error;
        })
      )
  }

  getSales(confirmed: boolean): Observable<Venta[]> {
    const url = this.urlBaseApi + '/get_sales/';
    return this.http
      .post<{ status: number; ventas: Venta[] }>(url, {token: localStorage.getItem('token'), confirmed})
      .pipe(
        map((response) => {
          if (response.status != 200) {
            console.log("Ha ocurrido un error en la respuesta: ", response);
            throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          }
          console.log("Enviando ventas: ", response)
          return response.ventas;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Ha ocurrido un error en la respuesta: ", error);
          throw error;
        })
      )
  }

  getTiendas(): Observable<Tienda[]> {
    const url = this.urlBaseApi + '/get_shops/';
    return this.http
      .post<{ status: number; tiendas: Tienda[] }>(url, {token: localStorage.getItem('token')})
      .pipe(
        map((response) => {
          if (response.status != 200) {
            console.log("Ha ocurrido un error en la respuesta: ", response);
            throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          }
          console.log("Enviando tiendas: ", response)
          return response.tiendas;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Ha ocurrido un error en la respuesta: ", error);
          throw error;
        })
      )
  }

  getProducts(tienda?: Tienda): Observable<Producto[]> {
    const url = this.urlBaseApi + '/get_products/';
    console.log("Enviando la request de productos con este body: ", {tienda: tienda?.id});
    return this.http
      .post<{ status: number; productos: Producto[] }>(url,{token: localStorage.getItem('token'), tienda: tienda?.id})
      .pipe(
        map((response) => {
          if (response.status != 200) throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          console.log("Enviando productos de la tienda: ", tienda, " prodcuts: ", response);
          return response.productos;
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      )
  }

  getProductById(id: Number): Observable<Producto> {
    const url = this.urlBaseApi + '/get_product_by_id/';
    return this.http
      .post<{ status: number; producto: Producto }>(url,{token: localStorage.getItem('token'), id})
      .pipe(
        map((response) => {
          console.log("Resquest de producto por id: ", response);
          if (response.status != 200) throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          return response.producto;
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      )
  }
  getShopById(id: Number): Observable<Tienda> {
    const url = this.urlBaseApi + '/get_shop_by_id/';
    return this.http
      .post<{ status: number; tienda: Tienda }>(url,{token: localStorage.getItem('token'), id})
      .pipe(
        map((response) => {
          console.log("Resquest de tienda por id: ", response);
          if (response.status != 200) throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          return response.tienda;
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      )
  }


  unauthUser(email: string): Observable<boolean> {
    const url = this.urlBaseApi + '/logout/';
    return this.http.post<{status: number, message?: string}>(url, {email: email, token: localStorage.getItem('token')}).pipe(
      
      map(response => {
        return true;
      }),
      catchError(e => {
        console.log("Error de cerrado de sesión", e);
        return of(false);
      })
    );
  }

  authUserWithEmail(email: string): Observable<User> {
    const url = this.urlBaseApi + '/google_login/';
    return this.http
      .post<Response>(url, {
        email: email,
      })
      .pipe(
        map((response) => {
          console.log('Repuesta de la api: ', response);
          if (response.user && response.token) {
            console.log(
              'Enviando respuesta final, usuario enviado: ',
              response.user
            );
            localStorage.setItem('token',response.token);
            return response.user;
          } else {
            throw new HttpErrorResponse({status: response.status});
          }
        })
      );
  }

  postForm(formtoSend: FormData, to: string): Observable<Response> {
    const url = this.urlBaseApi + `/${to}/`;
    return this.http.put<Response>(url, formtoSend);
  }

  getFormSchema(formToGet: string): Observable<FormField[]> {
    const url = this.urlBaseApi + `/${formToGet}/`;
    const token = localStorage.getItem('token') || '';
    const formData = {
      'token': token
    }
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization':'authkey',
        //'userid':'1'
      }),
    };
    return this.http
      .post<{ status: number; campos: FormField[] }>(url, formData, httpOptions)
      .pipe(
        map((response) => {
          if (response.status != 200) throw new Error('No autorizado');
          return response.campos;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
  
  getMedia(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }


}
