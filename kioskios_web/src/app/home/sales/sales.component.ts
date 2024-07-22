import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Venta } from '../../models/venta';
import { User } from '../../models/user';
import { SaleCardComponent } from '../sale-card/sale-card.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [SaleCardComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit, AfterViewInit{

  confirmadas: Venta[] = [];
  noConfirmadas: Venta[] = [];
  user!: User
  
  @ViewChildren(SaleCardComponent) cardSales!: QueryList<SaleCardComponent>;

  constructor (
    private authService: AuthService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
    this.loadSales()
   
  }

  ngAfterViewInit(): void {
    for(const card of this.cardSales){
      card.confimedEmitter.subscribe(
        () => {
          this.confirmadas.push(card.sale);
          this.removeSaleFromNoConfirmadas(card.sale);
          this.cdr.detectChanges();
        }
      );
    }
  }



  loadSales() {
    this.confirmadas = [];
    this.noConfirmadas = [];
    this.api.getSales().subscribe(
      ventas => {
        for(const venta of ventas){
            this.api.getProductById(Number(venta.producto)).subscribe(
              producto => {
                venta.producto = producto;
                if (venta.confirmado) {
                  this.confirmadas.push(venta);
                } else {
                  this.noConfirmadas.push(venta);
                }
              }
            );          
        }
      }
    );
  }

  removeSaleFromNoConfirmadas(sale: Venta): void {
    const index = this.noConfirmadas.findIndex(v => v.id === sale.id);
    if (index > -1) {
      this.noConfirmadas.splice(index, 1);
    }
  }

}
