import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { response } from 'express';
import { error } from 'console';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlBaseApi : string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getFormSchema(formToGet : string) : Observable<FormField[]> {
    const url = this.urlBaseApi + `/${formToGet}`;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        //'Authorization':'authkey',
        //'userid':'1'
      })
    };
    return this.http.get<{campos: FormField[]}>(url, httpOptions).pipe(
      map(response => {
        console.log("Response: ", response);
        if(!response.campos) 
          throw new Error("No autorizado")
        return response.campos;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
