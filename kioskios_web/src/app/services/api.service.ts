import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormField } from '../models/form-field';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlApi = 'http://localhost:8000/api/';
  campos: FormField[] = [
    { tipoCampo: 'input', name: 'nombre', label: 'Nombre', type: 'text', validators: {maxlength: '10'} },
    { tipoCampo: 'input', name: 'apellidos', label: 'Apellidos', type: 'text', validators: {minlength: '2'}},
    { tipoCampo: 'input', name: 'email', label: 'Email',  type: 'email'},
    { tipoCampo: 'select', name: 'foreign', label: 'Foreign', validators: {required: 'true'}, options: [{label: 'Option1', value: 'Option1'}, {label: 'Option2', value: 'Option2'}, {label: 'Option2', value: 'Option2'}]}
  ];


  constructor(private http: HttpClient) { }

  getFormSchema(formToGet : string) : Observable<FormField[]> {
    const url = `${this.urlApi}create_${formToGet}`;
    // return this.http.get<FormField[]>(url);
    return of(this.campos);
  }
}
