import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Tienda } from '../tienda';
import { ApiService } from '../services/api.service';
import { Producto } from '../models/product';
import { MODEL_URL } from '../constants';

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
  
  constructor(
    private api: ApiService
  ) {
    
    
  }
  ngOnInit(): void {
    console.log("Esta tienda se recibió: ", this.tienda);
    if(this.tienda.id){
      console.log("Tienda obtenida en el componente de lista de productos: ", this.tienda);
      this.api.getProducts(this.tienda).subscribe(
        productos => {
          this.products = productos;
        }
      );
    }
  }

}
