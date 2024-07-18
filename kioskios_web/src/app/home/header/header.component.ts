import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  showSignOutButton: boolean = false;
  user$: Observable<User | undefined>
  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private router: Router
  ){
    library.addIcons(faCartShopping, faMagnifyingGlass);
    this.user$ = this.authService.getUserLoaded();
    this.user$.subscribe(r => {
      console.log("Usuario recibido: ", r);
    });
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this.authService.signOut();
    this.user$ = this.authService.getUser();
    this.user$.subscribe(r => {
      console.log("Usuario recibido para singOut: ", r);
    });
    this.router.navigate(['/']);

  }

  showSignOut() {
    this.showSignOutButton = !this.showSignOutButton;
  }
  
}
