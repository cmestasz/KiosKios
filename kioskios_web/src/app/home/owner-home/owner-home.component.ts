import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/product';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css',
})
export class OwnerHomeComponent {
  productos: Producto[] = [];
  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getProducts().subscribe((objects) => {
      this.productos = objects;
    });
  }
}
