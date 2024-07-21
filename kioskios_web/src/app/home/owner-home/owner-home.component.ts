import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/product';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Tienda } from '../../models/tienda';
import { User } from '../../models/user';
import { EMPTY_USER } from '../../constants';
import { AuthService, getUserLocal } from '../../services/auth.service';
import { filter } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductListComponent],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css',
})
export class OwnerHomeComponent implements OnInit {
  user: User;
  tiendas: Tienda[];
  counterUserChange: number;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.counterUserChange = 0;
    this.tiendas = [];
    this.user = EMPTY_USER;
    
  }

  ngOnInit(): void {

    this.apiService.getTiendas().subscribe( tiendas => {
      this.tiendas = tiendas;
    });
    
    this.handleUser();
  }

  handleUser(): void {
    
    this.user = getUserLocal();
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        this.handleTypeUser();
      }
    )

  }

  handleTypeUser(): void {
    if (this.user.tipo == 'US') {
      this.redirectTo('/user');
    } else if (this.user.tipo == 'AD') {
      this.redirectTo('/admin');
    } else if (!this.user.email) {
      console.log("Usuario vacío");
      this.redirectTo('/');
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
