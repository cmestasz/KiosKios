import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../models/product';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CATEGORY, CategoryKey } from '../constants';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  @Input('product') product!: Producto;
  image!: SafeUrl;

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer
  ){}

  viewProduct() {
    // Detalles del producto
  }

  ngOnInit(): void {
    this.product.categoria = CATEGORY[this.product.categoria as CategoryKey] || "Otro";
    this.loadImage();
  }
  loadImage(): void {
    this.api.getMedia(this.product.imagen).subscribe(
      imageBlob => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => {
        console.error('Error al cargar la imagen del producto', error);
      }
    );
  }
}
