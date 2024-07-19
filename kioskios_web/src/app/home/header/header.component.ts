import { Component, HostListener } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EMPTY_USER } from '../../constants';


@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent {
  isMenuOpen: boolean = true;
  showSignOutButton: boolean = false;
  user: User;
  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private router: Router
  ){
    library.addIcons(faCartShopping, faMagnifyingGlass);
    this.user = EMPTY_USER;
    this.authService.getUser().subscribe(
      user => {
        console.log("Recibiendo el usuario en el componente header: ", user);
        this.user = user;
      }
    );
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth <= 868) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);    

  }

  showSignOut() {
    this.showSignOutButton = !this.showSignOutButton;
  }
  
}
