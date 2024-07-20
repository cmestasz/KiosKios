import { Component, Input } from '@angular/core';
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
export class ProductListComponent {
  @Input('tienda') tienda!: Tienda;
  products!: Producto[];
  
  constructor(
    private api: ApiService
  ) {
    this.api.getProducts(this.tienda).subscribe(
      productos => {
        this.products = productos;
      }
    );
  }
}
