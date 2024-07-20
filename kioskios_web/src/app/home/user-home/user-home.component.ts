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
  tiendas!: Tienda[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ){
    this.user = EMPTY_USER;
    this.authService.getUser().pipe(
      tap(
        user => {
          if (user.email === undefined || user.email === '') {
            console.log("Usuario no autentificado");
            this.router.navigate(['/']);
          }
        }
      ),
      filter(user => user.email !== undefined && user.email !== '')
    ).subscribe(
      user => {
        console.log("Recibiendo usuario en el componente User: " + user);    
        this.user = user;
    });

    this.api.getTiendas().subscribe(
      tiendas => {
        this.tiendas = tiendas;
      }
    );

  }

}
