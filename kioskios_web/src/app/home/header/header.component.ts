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
      <div>
        <img alt="logo">
      </div>
      <div>
        <form action="." method="GET">
          <label for="q"></label>
          <input type="text" name="q">
          <button>Buscar</button>
        </form>
      </div>
      <div>
        <a [routerLink]="['/login']">Login</a>
        <a [routerLink]="['/register']">Register</a>

      </div>
      <div>
        <a [routerLink]="['/cart']"><fa-icon [icon]="['fas', 'cart-shopping']"></fa-icon> Carrito</a>
      </div>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {

  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping);
  }
}
