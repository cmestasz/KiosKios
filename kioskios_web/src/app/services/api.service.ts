import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { Producto } from '../models/product';
import { Form } from '../form';
import { User } from '../models/user';
import { response } from 'express';
import { error } from 'console';
import { EMPTY_USER } from '../constants';
import { Tienda } from '../tienda';
import { Venta } from '../venta';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBaseApi: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getTiendas(): Observable<Tienda[]> {
    const url = this.urlBaseApi + '/get_tiendas/';
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
    const url = this.urlBaseApi + '/get_productos/';
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

  getVentas(): Observable<Venta[]> {
    const url = this.urlBaseApi + '/get_productos';
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
    const url = this.urlBaseApi + '/cerrar_sesion/';
    return this.http.post<{status: number, message?: string}>(url, {email: email, token: localStorage.getItem('token')}).pipe(
      map(response => {
        if (response.status == 200) {
          return true;
        }
        return false;
      }),
      catchError(e => {
        console.log("Error de cerrado de sesión");
        return of(false);
      })
    );
  }

  authUserWithEmail(email: string): Observable<User> {
    const url = this.urlBaseApi + '/iniciar_sesion_google/';
    return this.http
      .post<{ status: number; message?: string; user?: User }>(url, {
        email: email,
      })
      .pipe(
        map((response) => {
          console.log('Repuesta de la api: ', response);
          if (response.user) {
            console.log(
              'Enviando respuesta final, usuario enviado: ',
              response.user
            );
            return response.user;
          }
          console.log('Enviando respuesta final: ', EMPTY_USER);
          return EMPTY_USER;
        })
      );
  }

  postForm(formtoSend: FormData, to: string): Observable<any> {
    const url = this.urlBaseApi + `/${to}/`;
    return this.http.post<Form>(url, formtoSend);
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

}
