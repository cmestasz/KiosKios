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

  constructor(
    private apiService: ApiService
  ) {
    this.tiendas = [];
    this.user = EMPTY_USER; 
  }
  ngOnInit(): void {
    console.log("Iniciando componente de propietario  ");
    this.apiService.getTiendas().subscribe( tiendas => {
      console.log("TIendas obtenidas: ", tiendas);
      this.tiendas = tiendas;
    });
  
  }

}
