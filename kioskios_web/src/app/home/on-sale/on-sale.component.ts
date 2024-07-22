import { Component, OnInit } from '@angular/core';
import { Venta } from '../../models/venta';
import { SalesService } from '../../services/sales.service';
import { EMPTY_SALE } from '../../constants';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-on-sale',
  standalone: true,
  imports: [],
  templateUrl: './on-sale.component.html',
  styleUrl: './on-sale.component.css'
})
export class OnSaleComponent implements OnInit{
  sale: Venta

  constructor(
    private salesService: SalesService,
    private api: ApiService
  ) {
    this.sale = EMPTY_SALE;

  }

  ngOnInit(): void {
    this.salesService.getCurrentSale().subscribe(
      sale => {
        this.sale = sale;
        this.api.getShopById
      }
    );
  }

}
