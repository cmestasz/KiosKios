import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EMPTY_SALE } from '../constants';
import { Venta } from '../models/venta';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  saleSubject: BehaviorSubject<Venta>;

  constructor(
    private authService: AuthService
  ) {
    this.saleSubject = new BehaviorSubject<Venta>(EMPTY_SALE);
  }

  getCurrentSale(): Observable<Venta> {
    return this.saleSubject.asObservable();
  }

  setCurrentSale(sale: Venta) {
    this.saleSubject.next(sale);
  }




}
