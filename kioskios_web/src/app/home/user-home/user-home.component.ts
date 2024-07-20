import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { EMPTY_USER } from '../../constants';
import { filter, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Tienda } from '../../tienda';
import { ProductListComponent } from '../../product-list/product-list.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent{
  user: User;
  tiendas: Tienda[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ){
    const userData = localStorage.getItem('user');
    this.user = EMPTY_USER;
    if(userData)
      this.user = JSON.parse(userData);
    else
      this.router.navigate(['/']);
    

    this.api.getTiendas().subscribe(
      tiendas => {
        this.tiendas = tiendas;
      }
    );

  }

}
