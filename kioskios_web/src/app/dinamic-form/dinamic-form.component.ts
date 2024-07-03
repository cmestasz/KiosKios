import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../models/form-field';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'dinamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})
export class DinamicFormComponent{

  form: FormGroup;
  fields: FormField[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ){
    this.form = this.formBuilder.group({
    });
  }

  loadSchema(model: string): void{
    this.form = this.formBuilder.group({});
    this.api.getFormSchema(model).subscribe(fieldsReceived => {
      this.fields = fieldsReceived;
      this.buildForm();
    });
  }

  buildForm(){
    for(const field of this.fields) {
      const control = this.formBuilder.control('', this.getValidators(field));
      this.form.addControl(field.name, control);
    }
  }

  getValidators(field: FormField){
    const validators = [];
    if(field.attributes?.['type'] == 'email'){
      validators.push(Validators.email);
    }
    if(field.validators){
      for(const [key, value] of Object.entries(field.validators)){
        switch(key){
          case 'required':
            validators.push(Validators.required); break;
          case 'maxlength':
            validators.push(Validators.maxLength(Number(value))); break;
          case 'minlength':
            validators.push(Validators.minLength(Number(value))); break;
          default:
            console.warn(`This validator is not supported: ${key}`);
        }
      }
    }
    return validators;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      // Enviar datos a la API
    } else {
      this.form.markAllAsTouched();  
      console.error('Formulario no válido');
    }
  }

  getValidatorMessage(fieldName: string) {
    const control = this.form.controls[fieldName];
    if (control.errors) {
      return Object.keys(control.errors)
        .map(key => {
          switch (key) {
            case 'required':
              return 'Este campo es obligatorio';
            case 'minlength':
              return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
            case 'maxlength':
              return `Debe tener como máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
            default:
              return '';
          }
        })
        .join(', ');
    }
    return '';
  }
}
