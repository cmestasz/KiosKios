import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
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
  user$: Observable<User | undefined>
  constructor(
    library: FaIconLibrary,
    private authService: AuthService
  ){
    library.addIcons(faCartShopping, faMagnifyingGlass);
    this.user$ = this.authService.getUserAsObservable();
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    // Cerrar sesión del usuario
  }

  showSignOut() {
    
  }
  
}
