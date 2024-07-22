import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent implements OnInit{
  isMenuOpen: boolean = true;
  showSignOutButton: boolean = false;
  user: User;
  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private router: Router
  ){
    library.addIcons(faCartShopping, faMagnifyingGlass);
    this.user = this.authService.getUserLocal();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth <= 868) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
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
