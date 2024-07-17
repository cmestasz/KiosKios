import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  template: ``,
})
export class AuthRedirectComponent {

  constructor(private authService: AuthService,private router: Router){
    this.authService.getUser().subscribe(user => {
      if(user){
      
        if (user.tipo == 'US') {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/owner']);
        }
      }else{
        console.log("Usuario no existe, debe crear cuenta");
        this.router.navigate(['/register']);
      }
    });
    
  }

}
