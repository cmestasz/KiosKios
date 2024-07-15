import { Component, ComponentRef, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { DinamicFormComponent } from '../dinamic-form.component';
import { TYPE_FORMS } from '../../constants';
import { Response } from '../../models/response';

@Component({
  selector: 'loader-form',
  standalone: true,
  imports: [],
  template: `
  `
})
export class LoaderFormComponent {
  private componentRef!: ComponentRef<DinamicFormComponent>;
  @Output() formSubmitted: EventEmitter<Response> = new EventEmitter();


  constructor(
    private viewContainer: ViewContainerRef,
  ){
    
  }

  createForm(typeForm: string): void {
    if(this.componentRef)
      this.componentRef.destroy();
    this.componentRef = this.viewContainer.createComponent(DinamicFormComponent);
    if(this.componentRef && this.componentRef.instance){
      this.componentRef.instance.loadSchema(typeForm);
      this.componentRef.instance.formSubmitted.subscribe((response: Response) => {
        console.log("reemitiendo el evento");
        this.formSubmitted.emit(response);
      });
    }else{
      console.log("El componente no se ha podido cargar correctamente");
    }
  }

}
