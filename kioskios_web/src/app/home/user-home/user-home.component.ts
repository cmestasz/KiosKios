import { Component, OnInit } from '@angular/core';
import { AuthService, getUserLocal } from '../../services/auth.service';
import { User } from '../../models/user';
import { EMPTY_USER } from '../../constants';
import { filter, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Tienda } from '../../models/tienda';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  user: User;
  tiendas: Tienda[] = [];
  counterUserChange: number;
  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    this.counterUserChange = 0;
    this.user = EMPTY_USER;
  }

  ngOnInit(): void {
    
    this.handleUser();
    // this.handleUser();
    this.api.getTiendas().subscribe(
      tiendas => {
        this.tiendas = tiendas;
      }
    );
  }

  handleUser(): void {
    this.user = getUserLocal();
    this.authService.getUser().pipe(
      filter( user => ++this.counterUserChange == 2)
    ).subscribe(
      user => {
        this.user = user;
        this.handleTypeUser();
      }
    );
  }

  handleTypeUser(): void {
    if (this.user.tipo == 'DU') {
      this.redirectTo('/owner');
    } else if (this.user.tipo == 'AD') {
      this.redirectTo('/admin');
    } else {
      this.redirectTo('/');
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
