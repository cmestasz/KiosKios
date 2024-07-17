import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../models/form-field';
import { ApiService } from '../services/api.service';
import { Response } from '../models/response';

@Component({
  selector: 'dinamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})
export class DinamicFormComponent {
  @Output() formSubmitted: EventEmitter<Response> = new EventEmitter();
  form: FormGroup;
  fields: FormField[] = [];
  model!: string;
  isMultiple: boolean = false;
  selectedFiles: {[key: string]: File} = {};

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.form = this.formBuilder.group({
    });
  }

  loadSchema(model: string): void {
    this.model = model;
    this.form = this.formBuilder.group({});
    this.api.getFormSchema(model,).subscribe(fieldsReceived => {
      this.fields = fieldsReceived;
      this.buildForm();
    });
  }

  buildForm() { 
    for (const field of this.fields) {
      let control;
      if(field.attributes?.['type'] == 'file'){
        this.isMultiple = true;
        console.log("Este form enviará archivos");
      }
      control = this.formBuilder.control('', this.getValidators(field));
      this.form.addControl(field.name, control);
    }
  }

  getValidators(field: FormField) {
    const validators = [];
    if (field.validators) {
      for (const [key, value] of Object.entries(field.validators)) {
        switch (key) {
          case 'required':
            validators.push(Validators.required); break;
          case 'maxlength':
            validators.push(Validators.maxLength(Number(value))); break;
          case 'minlength':
            validators.push(Validators.minLength(Number(value))); break;
          case 'email':
            validators.push(Validators.email); break;
          default:
            console.warn(`This validator is not supported: ${key}`);
        }
      }
    }
    return validators;
  }

  onSubmit(): void {
    if (this.form.valid) {

      // Enviar datos a la API
      let formToSend = this.form.value;
      if (this.isMultiple) {
        formToSend = new FormData();
        Object.keys(this.form.controls).forEach(key => {
          const controlValue = this.form.get(key)?.value;
          console.log("Creando el campo ", key, " en el formData ");
          if (this.selectedFiles[key]) {
            console.log("Se detectó un campo file");
            formToSend.append(key, this.selectedFiles[key], this.selectedFiles[key]);
          } else {
            formToSend.append(key, controlValue);
          }
        });

      }
      console.log("El formulario es de tipo FormData: ", formToSend instanceof FormData);
      console.log('Formulario enviado:', formToSend);
      this.api.postForm(formToSend, this.model).subscribe((response: Response) => {
        console.log(response);
        alert(response.message);
        if (response.status == 201 || response.status == 200) {
          console.log("emitiendo evento");
          this.formSubmitted.emit(response);
        }
      });

    } else {
      this.form.markAllAsTouched();
      console.error('Formulario no válido');
    }
  }

  imageInputPicked(event: Event, name: string) {
    const input = (event.target as HTMLInputElement)
    const file = input.files?.item(0);
    if(file)
      this.selectedFiles[name] = file;
    console.log("Clave del campo de archivo: ", name);
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
            case 'email':
              return 'Ingrese un email correcto';
            default:
              return '';
          }
        })
        .join(', ');
    }
    return '';
  }
}
