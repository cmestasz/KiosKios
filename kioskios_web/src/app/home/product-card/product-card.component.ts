import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../models/product';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CATEGORY, CategoryKey, EMPTY_USER } from '../../constants';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

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
  user: User;

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ){
    this.user = EMPTY_USER;
  }

  viewProduct() {
    if (this.user.tipo == 'DU') {
      this.router.navigate([`/dashboard/owner/product/${this.product.id}`]);
    } else {
      this.router.navigate([`/dashboard/user/product/${this.product.id}`]);
    }
  }

  ngOnInit(): void {
    this.product.categoria = CATEGORY[this.product.categoria as CategoryKey] || "Otro";
    this.loadImage();
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }
  loadImage(): void {
    if (typeof this.product.imagen == 'string') {
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
}
