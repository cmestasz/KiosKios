import { Component, Input } from '@angular/core';
import { Producto } from '../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Producto;

  viewProduct() {
    // Detalles del producto
  }
}
