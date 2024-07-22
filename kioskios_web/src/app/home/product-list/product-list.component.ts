import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Tienda } from '../../models/tienda';
import { ApiService } from '../../services/api.service';
import { Producto } from '../../models/product';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { EMPTY_USER } from '../../constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  @Input('tienda') tienda: Tienda = {} as Tienda;
  products: Producto[] = [];
  user: User;
  
  constructor(
    private api: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = EMPTY_USER;
  }
  ngOnInit(): void {
    console.log("Esta tienda se recibió: ", this.tienda);
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
    if(this.tienda.id){
      console.log("Tienda obtenida en el componente de lista de productos: ", this.tienda);
      this.api.getProducts(this.tienda).subscribe(
        productos => {
          this.products = productos;
        }
      );
    }
  }

  loadShop(): void {
    if (this.user.tipo == 'DU') {
      this.router.navigate(['/dashboard/owner/shop/' + this.tienda.id]);      
    } else {
      this.router.navigate(['/dashboard/user/shop/' + this.tienda.id])
    }
  }

}
