import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Venta } from '../../models/venta';
import { SalesService } from '../../services/sales.service';
import { EMPTY_SALE } from '../../constants';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-sale',
  standalone: true,
  imports: [],
  templateUrl: './on-sale.component.html',
  styleUrl: './on-sale.component.css'
})
export class OnSaleComponent implements OnInit, AfterViewInit{
  sale: Venta;
  qr!: SafeUrl;
  @ViewChild('continuebtn') continuebtn!: ElementRef<HTMLButtonElement>;

  constructor(
    private salesService: SalesService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.sale = EMPTY_SALE;

  }

  ngOnInit(): void {
    
    this.salesService.getCurrentSale().subscribe(
      sale => {
        if (!sale.usuario ) {
          this.router.navigate(['/dashboard/user']);
        }
        this.sale = sale;
        this.api.getQrByShop(this.sale.tiendaId).subscribe(
          url => {
            this.api.getMedia(url).subscribe({
              next: (imageBlob) => {
                const objectUrl = URL.createObjectURL(imageBlob);
                this.qr = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                this.continuebtn.nativeElement.disabled = false;
              },
              error: err => {
                throw new Error(err);
              }
            });
          }
        )
      }
    );
  }
  ngAfterViewInit(): void {
    this.continuebtn.nativeElement.disabled = true;
  }

  putVenta(): void {

  }

}
