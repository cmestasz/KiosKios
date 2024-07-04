import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoaderFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  loadOwner() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_OWNER);
  }

  loadUser() : void {
    this.loaderForm.createForm(TYPE_FORMS.CREATE_USER);
  }

}
