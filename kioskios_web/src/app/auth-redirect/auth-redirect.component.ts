import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  template: ``,
})
export class AuthRedirectComponent implements OnInit{

  successRedir: boolean;

  constructor(private authService: AuthService,private router: Router){
    this.successRedir = false;
  }

  ngOnInit(): void {
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
      this.successRedir = true
    });
    console.log("Esperando una respuesta durante 5 segundos, se redirigirá al home después de este tiempo si no se ha hecho un redirección correcta");
    setTimeout(() => {
      if(!this.successRedir)
        this.router.navigate(['/']);
    }, 5000)
  }

}
