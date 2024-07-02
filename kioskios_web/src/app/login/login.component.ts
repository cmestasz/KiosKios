import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { DinamicFormComponent } from '../dinamic-form/dinamic-form.component';

@Component({
  selector: 'loader-form',
  standalone: true,
  imports: [DinamicFormComponent],
  template: `
    
  `,
})

export class LoaderForm {

  private componentRef: ComponentRef<DinamicFormComponent>;

  constructor(
    private viewContainer: ViewContainerRef,
  ){
    this.componentRef =  this.viewContainer.createComponent(DinamicFormComponent);
    if(this.componentRef && this.componentRef.instance){
      this.componentRef.instance.loadSchema("login");
    }
  }

}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
