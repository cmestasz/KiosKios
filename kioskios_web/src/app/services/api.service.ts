import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { Producto } from '../models/product';
import { User } from '../models/user';
import { EMPTY_USER } from '../constants';
import { Tienda } from '../models/tienda';
import { Venta } from '../models/venta';
import { Response } from '../models/response';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBaseApi: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getTiendas(): Observable<Tienda[]> {
    const url = this.urlBaseApi + '/get_shops/';
    return this.http
      .post<{ status: number; tiendas: Tienda[] }>(url, {token: localStorage.getItem('token')})
      .pipe(
        map((response) => {
          if (response.status != 200) throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          console.log("Enviando tiendas: ", response)
          return response.tiendas;
        }),
        catchError((error: HttpErrorResponse) => {
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
    const url = this.urlBaseApi + '/get_producto_por_id/';
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

  getVentas(): Observable<Venta[]> {
    const url = this.urlBaseApi + '/get_sales/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .get<{ status: number; ventas: Venta[] }>(url, httpOptions)
      .pipe(
        map((response) => {
          if (response.status != 200) throw new HttpErrorResponse({status: 401, statusText: "Desautorizado, probablemente el token ha expirado"});
          return response.ventas;
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

  postForm(formtoSend: FormData, to: string): Observable<any> {
    const url = this.urlBaseApi + `/${to}/`;
    return this.http.post<FormData>(url, formtoSend);
  }

  getFormSchema(formToGet: string): Observable<FormField[]> {
    const url = this.urlBaseApi + `/${formToGet}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization':'authkey',
        //'userid':'1'
      }),
    };
    return this.http
      .get<{ status: number; campos: FormField[] }>(url, httpOptions)
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
