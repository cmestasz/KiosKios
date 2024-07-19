import { Component, HostListener } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TYPE_FORMS } from '../../constants';
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
    this.apiService.getObjectSchema().subscribe((objects) => {
      this.productos = objects;
    });
  }
}
