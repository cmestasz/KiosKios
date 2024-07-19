import { Component , HostListener} from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EMPTY_PRODUCT } from '../../constants';
import { EMPTY_USER } from '../../constants';

import { Router, RouterLink} from '@angular/router';
import { Producto } from '../../models/product';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  user$: Observable<User>;
  productos$: Observable<Producto[]>;
  constructor(private authService: AuthService,private router: Router  ){
    this.productos$ = this.authService.getProductos();
    this.user$ = this.authService.getUser();
  }


}
