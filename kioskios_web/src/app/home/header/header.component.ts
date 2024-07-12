import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping, faMagnifyingGlass);
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
