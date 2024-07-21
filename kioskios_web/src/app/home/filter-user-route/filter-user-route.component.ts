import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService, getUserLocal } from '../../services/auth.service';
import { EMPTY_USER } from '../../constants';

@Component({
  selector: 'app-filter-user-route',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class FilterUserRouteComponent {

  user: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = EMPTY_USER;
    
  }

  ngOnInit(): void {
    
    console.log("Iniciando filtrado de usuarios");
    this.handleUser();
  }

  handleUser(): void {
    
    this.user = getUserLocal();
    this.authService.getUser().subscribe(
      user => {
        console.log("Se recibio el usuario: ", this.user);
        this.user = user;
        this.handleTypeUser();
      }
    )

  }

  handleTypeUser(): void {
    if (this.user.tipo == 'US') {
      //if (!this.router.isActive('/dashboard/user', false)) 
        this.redirectTo('/dashboard/user');        
    } else if (this.user.tipo == 'AD') {
      //if (!this.router.isActive('/dashboard/admin', false)) 
        this.redirectTo('/dashboard/admin');        
    } else if (this.user.tipo == 'DU') {
      //if (!this.router.isActive('/dashboard/owner', false)) 
        this.redirectTo('/dashboard/owner');
    } else {
    //} else if (!this.user.email) {
      console.log("Usuario vacío");
      this.redirectTo('/');
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
