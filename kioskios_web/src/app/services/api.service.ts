import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormField } from '../models/form-field';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getFormSchema(formToGet : string) : Observable<FormField[]> {
    const url = `${this.urlApi}${formToGet}/form-schema/`;
    return this.http.get<FormField[]>(url);
  }
}
