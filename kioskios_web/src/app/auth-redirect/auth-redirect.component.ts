import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  template: ``,
})
export class AuthRedirectComponent {

  constructor(private authService: AuthService,private router: Router){

    this.authService.getUserForRedirect().subscribe(user => {
      if(user.email){ // Si es undefined, significa que está vacío
        console.log("Se recibió una respuesta en el redirect");
        if (user.tipo == 'US') {
          this.router.navigate(['/user'], {replaceUrl: true});
        } else {
          this.router.navigate(['/owner'], {replaceUrl: true});
        }
      }else{
        console.log("Usuario no existe, debe crear cuenta, redirigiendo al registro");
        this.router.navigate(['/register'], {replaceUrl: true});
      }
    });
    
  }

}
