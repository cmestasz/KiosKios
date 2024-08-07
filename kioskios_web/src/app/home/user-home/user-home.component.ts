import { Component, OnInit } from '@angular/core';
import { AuthService,  } from '../../services/auth.service';
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
  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {
    this.user = EMPTY_USER;
  }

  ngOnInit(): void {
    this.user = this.authService.getUserLocal();
    this.api.getTiendas().subscribe(
      tiendas => {
        this.tiendas = tiendas;
      }
    );
  }

}
