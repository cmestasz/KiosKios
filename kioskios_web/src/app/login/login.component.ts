import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderFormComponent, FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  ngAfterViewInit(): void {
    if(this.loaderForm)
      this.loaderForm.createForm(TYPE_FORMS.LOGIN);
    else
      console.log("No se pudo cargar el formulario de login");
  }

}
