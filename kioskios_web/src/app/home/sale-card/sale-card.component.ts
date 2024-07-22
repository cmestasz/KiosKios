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
    private router: Router
    
  ) {
    this.confimedEmitter = new EventEmitter<void>();
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  getBoleta(): void {
    if (this.user.tipo == 'US') {
      this.router.navigate(['/dashboard/user/sale/ticket/' + this.sale.id]);
    } else {
      this.router.navigate(['/dashboard/owner/sale/ticket/' + this.sale.id]);
    }
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
