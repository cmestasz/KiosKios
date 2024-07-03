import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<{campos: FormField[]}>(url).pipe(
      map(response => {
        if(!response.campos){}
          throw new Error("No autorizado")
        return response.campos;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
