import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <header>
        <div class="header-left">
            <div class="logo">
                <img src="logo.png" alt="Kioskios Logo">
            </div>
            <div class="search">
                <section class="search-bar">
                    <form action="." method="GET">
                      <label for="q"></label>
                      <input type="text" name="q" placeholder="Busca un artículo">
                      <button>Buscar</button>
                    </form>
                </section>
            </div>
        </div>
        <nav>
            <ul>
                <li><a [routerLink]="['/cart']"><fa-icon [icon]="['fas', 'cart-shopping']"></fa-icon> Carrito</a></li>
                <li><a [routerLink]="['/login']">Login</a></li>
                <li><a [routerLink]="['/register']">Register</a></li>
            </ul>
        </nav>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {

  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping);
  }
}
