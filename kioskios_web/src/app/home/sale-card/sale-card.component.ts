import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Venta } from '../../models/venta';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-card',
  standalone: true,
  imports: [],
  templateUrl: './sale-card.component.html',
  styleUrl: './sale-card.component.css'
})
export class SaleCardComponent {
  @Input('sale') sale!: Venta;
  @Input('confirmed') confirmed!: boolean;
  user!:  User
  @Output() confimedEmitter: EventEmitter<void>;

  constructor (
    private api: ApiService,
    private authService: AuthService,
    
  ) {
    this.confimedEmitter = new EventEmitter<void>();
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  notifySale() {
    if(this.sale.id){
      this.api.confirmSale(this.sale.id).subscribe(
        response => {
          if (response) {
            this.confimedEmitter.emit();
            

          }
        }
      );
    }
  }

}
