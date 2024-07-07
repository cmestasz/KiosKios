import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
                      <button class="busqueda"><fa-icon [icon]="['fas', 'magnifying-glass']"></fa-icon></button>
                    </form>
                </section>
            </div>
        </div>
        <nav>
            <ul>
                <li><a [routerLink]="['/cart']"><fa-icon [icon]="['fas', 'cart-shopping']"></fa-icon> Carrito |</a></li>
                <li><a [routerLink]="['/login']">Iniciar Sesión</a></li>
                <li><a [routerLink]="['/register']" class="register">Regístrate</a></li>
            </ul>
        </nav>
    </header>
  `,
  styles: `
    /* Estilo del encabezado */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 5%;
        background: #fff;
        border-bottom: 1px solid #ddd;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 1000;
        box-sizing: border-box;
        
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
        padding: 0.5em 1em;
        display: block;
        white-space: nowrap;
    }

    nav ul li .register {
        color:#ffffff;
        background-color:#ff9900 ;
        border-radius: 10%;
        padding: 10px;
    }
    
    .busqueda{
        color:#ffffff;
        background-color:#ff9900 ;
        border-radius: 10%;
        padding: 5px;  
        border-color: #ff9900; 
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
        box-sizing: border-box;
    }

    /* Ajustes responsivos */
    @media (max-width: 768px) {
        header {
            flex-direction: column;
            align-items: flex-start;
        }

        .header-left {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav ul {
            flex-direction: column;
            width: 100%;
        }

        nav ul li {
            width: 100%;
            text-align: center;
        }

        nav ul li a {
            padding: 10px;
            width: 100%;
        }

        .search-bar {
            width: 100%;
        }

        .search-bar input {
            width: calc(100% - 20px);
        }
    }  `
})
export class HeaderComponent {

  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping, faMagnifyingGlass);
  }
}
