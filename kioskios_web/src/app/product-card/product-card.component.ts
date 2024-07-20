import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../models/product';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CATEGORY, CategoryKey } from '../constants';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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
    private sanitizer: DomSanitizer,
    private router: Router
  ){}

  viewProduct() {
    this.router.navigate([`/user/product/${this.product.id}`]);
  }

  ngOnInit(): void {
    this.product.categoria = CATEGORY[this.product.categoria as CategoryKey] || "Otro";
    this.loadImage();
  }
  loadImage(): void {
    this.api.getMedia(this.product.imagen).subscribe({
      next: (imageBlob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: err => {
        throw new Error(err);
      }
  });
  }
}
