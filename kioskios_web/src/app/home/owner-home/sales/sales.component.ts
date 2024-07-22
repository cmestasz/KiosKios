import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../models/venta';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  confirmadas: Venta[] = [];
  noConfirmadas: Venta[] = [];
  user!: User

  constructor (
    private authService: AuthService,
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }


  loadVentas() {

  }
}
