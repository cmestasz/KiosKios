import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { DinamicFormComponent } from '../dinamic-form.component';
import { TYPE_FORMS } from '../../constants';

@Component({
  selector: 'loader-form',
  standalone: true,
  imports: [],
  template: `
  `
})
export class LoaderFormComponent {
  private componentRef!: ComponentRef<DinamicFormComponent>;

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
    }else{
      console.log("El componente no se ha podido cargar correctamente");
    }
  }

}
