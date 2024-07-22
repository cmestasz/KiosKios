import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-ticket',
  standalone: true,
  imports: [],
  templateUrl: './sale-ticket.component.html',
  styleUrl: './sale-ticket.component.css'
})
export class SaleTicketComponent implements OnInit {
  pdfUrl!: SafeUrl;
  saleId!: number;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.saleId = Number(params.get('id'));
      if (this.saleId) {
        this.showPDF(this.saleId);
      }
    });
  }

  showPDF(id: number) {
    this.apiService.getSaleTicket(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error: (error) => {
        console.error('Error al descargar el PDF', error);
      }
  });
  }
}
