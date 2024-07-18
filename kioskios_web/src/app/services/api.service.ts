import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { Form } from '../form';
import { User } from '../models/user';
import { response } from 'express';
import { error } from 'console';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlBaseApi : string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  unauthUser(email: string): Observable<boolean> {
    const url = this.urlBaseApi + '/cerrar_sesion/';
    return this.http.post<{status: number, message?: string}>(url, {email: email}).pipe(
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

  authUserWithEmail(email: string): Observable<User | undefined> {
    const url = this.urlBaseApi + '/iniciar_sesion_google/';
    return this.http.post<{status: number, message?: string, usuario?: User}>(url, {email: email}).pipe(
      map(response => {
        if (response.status != 200) {
          return undefined;
        }
        return response.usuario;
      })
    );
  }

  postForm(formtoSend: FormData, to: string):Observable<any>{
    const url = this.urlBaseApi + `/${to}/`;
    return this.http.post<Form>(url, formtoSend);
  }

  getFormSchema(formToGet : string) : Observable<FormField[]> {
    const url = this.urlBaseApi + `/${formToGet}`;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',

        //'Authorization':'authkey',
        //'userid':'1'
      })
    };
    return this.http.get<{status: number, campos: FormField[]}>(url, httpOptions).pipe(
      map(response => {
        if(response.status != 200)
          throw new Error("No autorizado")
        return response.campos;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
