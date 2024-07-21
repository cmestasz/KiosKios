import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { catchError } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <div class="redirect-container">
  <div class="loader">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
    <div class="dot dot4"></div>
  </div>
  <div class="redirect-message">
    Redirigiendo, por favor espera...
  </div>
</div>
  `,
  styles: `
  .redirect-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
}

.loader {
  display: flex;
  justify-content: space-between;
  width: 60px;
  margin-bottom: 20px;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #e09145;
  animation: bounce 1.5s infinite ease-in-out;
}

.dot1 {
  animation-delay: -0.3s;
  background: #e09145;
}

.dot2 {
  animation-delay: -0.15s;
  background: #ffcf2d;
}

.dot3 {
  background: #d9d9d9;
}

.dot4 {
  background: #eee;
}

.redirect-message {
  font-size: 1.5em;
  color: #333;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

  `
})
export class AuthRedirectComponent implements OnInit {

  successRedir: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.successRedir = false;
  }

  ngOnInit(): void {
    this.authService.getUserForRedirect().subscribe(user => {
      if (user.email) { // Si es undefined, significa que está vacío
        console.log("Se recibió una respuesta en el redirect");
        if (user.tipo == 'US') {
          this.router.navigate(['/dashboard/user'], { replaceUrl: true });
        } else {
          this.router.navigate(['/dashboard/owner'], { replaceUrl: true });
        }
      } else {
        console.log("Usuario no existe, debe crear cuenta, redirigiendo al registro");
        this.router.navigate(['/register'], { replaceUrl: true });
      }
      this.successRedir = true
    });
    console.log("Esperando una respuesta durante 5 segundos, se redirigirá al home después de este tiempo si no se ha hecho un redirección correcta");
    setTimeout(() => {
      if (!this.successRedir)
        this.router.navigate(['/']);
    }, 5000)
  }

}
