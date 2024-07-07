import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoaderFormComponent, FooterComponent, HeaderComponent],
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
