import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { Response } from '../models/response';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderFormComponent, FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    if (this.loaderForm){
      this.loaderForm.createForm(TYPE_FORMS.LOGIN);
      this.loaderForm.formSubmitted.subscribe((response: Response) => {
        console.log("Escuchando desde el componnete login");
        if (response?.['user']?.['tipo'] == 'US') {
          this.router.navigate(['/user'], {state: {user: response.user}});
        } else {
          this.router.navigate(['/owner'], {state: {user: response.user}});
        }
      });
    }else{
      console.log("No se pudo cargar el formulario de login");
    }
  }
  



}
