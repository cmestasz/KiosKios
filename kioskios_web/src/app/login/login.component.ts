import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoaderFormComponent } from '../dinamic-form/loader-form/loader-form.component';
import { TYPE_FORMS } from '../constants';
import { FooterComponent } from '../home/footer/footer.component';
import { HeaderComponent } from '../home/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { Response } from '../models/response';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderFormComponent, FooterComponent, HeaderComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngAfterViewInit(): void {
    if (this.loaderForm) {
      this.loaderForm.createForm(TYPE_FORMS.LOGIN);
      this.loaderForm.formSubmitted.subscribe((response: Response) => {
        console.log("Escuchando desde el componente login");
        if (response.user) {
          this.authService.signIn(response.user);
          if (response?.['user']?.['tipo'] == 'US') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/owner']);
          }
        }

      });
    } else {
      console.log("No se pudo cargar el formulario de login");
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }




}
