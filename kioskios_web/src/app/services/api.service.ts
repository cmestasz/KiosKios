import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormField } from '../models/form-field';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlApi = 'http://localhost:8000/api/';
  campos1: FormField[] = [
    { tipoCampo: 'input', name: 'nombre', label: 'Nombre', type: 'text', validators: {maxlength: '10'} },
  ];
  campos2: FormField[] = [
    { tipoCampo: 'textarea', name: 'text', label: 'Texto', type: 'text', validators: {maxlength: '10'} },
  ];


  constructor(private http: HttpClient) { }

  getFormSchema(formToGet : string) : Observable<FormField[]> {
    const url = `${this.urlApi}create_${formToGet}`;
    // return this.http.get<FormField[]>(url);
    if(formToGet == 'login')
      return of(this.campos1);
    return of(this.campos2);
  }
}
