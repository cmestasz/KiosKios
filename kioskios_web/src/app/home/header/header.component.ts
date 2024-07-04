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
                <li><a [routerLink]="['/register']" class="register">Register</a></li>
            </ul>
        </nav>
    </header>
  `,
  styles: `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4% 5%;
      background: #fff;
      border-bottom: 1px solid #ddd;
      margin-top: 1%;
    }

    header .logo img {
        height: 60px;
    }
    .header-left{
        display: flex;
    }
    nav ul {
        list-style: none;
        display: flex;
        gap: 20px;
    }

    nav ul li a {
        text-decoration: none;
        color: #333;
    }

    nav ul li .register {
        color: #ff9900;
    }

    /* Barra de búsqueda */
    .search{
        justify-self: flex-start;
    }
    .search-bar {
        text-align: center;
        padding: 20px;
        background: hsl(0, 0%, 100%);
    }

    .search-bar input {
        padding: 10px;
        width: 80%;
        max-width: 500px;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        width: 300px;
        background-color: #ececec;
    }

  `
})
export class HeaderComponent {

  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping);
  }
}
