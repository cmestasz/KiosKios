import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { FormField } from '../models/form-field';
import { FormGroup } from '@angular/forms';
import { Form } from '../form';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlBaseApi : string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  postForm(formtoSend: Form, to: string, token: string):Observable<any>{
    const url = this.urlBaseApi + `/${to}/`;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'X-CSRFToken': token
        //'Authorization':'authkey',
        //'userid':'1'
      })
    };
    return this.http.post<Form>(url, formtoSend, httpOptions);
  }

  getFormSchema(formToGet : string) : Observable<{campos: FormField[], token: string}> {
    const url = this.urlBaseApi + `/${formToGet}`;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',

        //'Authorization':'authkey',
        //'userid':'1'
      })
    };
    return this.http.get<{status: number, campos: FormField[], token: string}>(url, httpOptions).pipe(
      map(response => {
        if(response.status != 200) 
          throw new Error("No autorizado")
        const resp = {
          campos: response.campos,
          token: response.token
        }
        return resp;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
