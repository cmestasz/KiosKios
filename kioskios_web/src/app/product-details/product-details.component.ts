import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/product';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: Producto;
  image!: SafeUrl

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        if (id) {
          this.api.getProductById(id).subscribe(
            product => {
              this.product = product;
              this.loadImage();
            }
          );
        } else {
          this.router.navigate(['/user']);
        }
      }
    );
  }
  backHome(): void {
    this.router.navigate(['/user']);
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
