import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../models/form-field';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dinamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})
export class DinamicFormComponent implements OnInit{

  form: FormGroup;
  fields: FormField[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ){
    this.form = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
      this.loadSchema("allin");
  }

  loadSchema(model: string): void{
    this.form = this.formBuilder.group({});
    this.api.getFormSchema(model).subscribe(fields => {
      this.fields = fields;
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
    if(field.type == 'email'){
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
      console.error('Formulario no válido');
    }
  }
}
