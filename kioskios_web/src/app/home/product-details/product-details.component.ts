import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/product';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../../models/user';
import { CATEGORY, CategoryKey, EMPTY_USER, TYPE_FORMS } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { LoaderFormComponent } from '../../dinamic-form/loader-form/loader-form.component';
import { SalesService } from '../../services/sales.service';
import { Venta } from '../../models/venta';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LoaderFormComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: Producto;
  image!: SafeUrl;
  user: User = EMPTY_USER;
  totalProducts: number = 1;
  categoria: string  = '';
  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;
  @ViewChild('buyButton') buyButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    if (this.buyButton) {
      this.buyButton.nativeElement.disabled = true;
    }
    this.totalProducts = 1;
    console.log("Iniciando componente de detalles");

    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        this.route.paramMap.subscribe(
          params => {
            const id = Number(params.get('id'));
            console.log("Parámetros de la ruta: id", id);
            if (id) {
              console.log("Petición a la api");
              this.api.getProductById(id).subscribe(
                product => {
                  console.log("Una entrega de producto: ", product);
                  this.product = product;
                  this.categoria = CATEGORY[this.product.categoria as CategoryKey];
                  console.log("Valor de la categoría: ", this.categoria);
                  this.loadImage();
                  if (this.buyButton) {
                    this.buyButton.nativeElement.disabled = false;
                  }
                }
              );
            } else {
              this.backHome();
            }
          }
        );
      }
    );
  }

  addOne() {
    this.totalProducts++;
  }

  minusOne() {
    if (this.totalProducts > 1) {
      this.totalProducts--;
    }
  }

  buy() : void {
    const venta: Venta = {
      usuario: this.user,
      producto: this.product,
      cantidad: this.totalProducts,
      tiendaId: Number(this.product.tienda),
      confirmado: false
    }
    this.salesService.setCurrentSale(venta);
    this.router.navigate(['/dashboard/user/on-sale']);
  }


  backHome(): void {
    if (this.user.tipo == 'US') {
      this.router.navigate(['/dashboard/user']);
    } else {
      this.router.navigate(['/dashboard/owner']);
    }
  }
  loadImage(): void {
    if (typeof this.product.imagen == 'string') {
      console.log(this.product.imagen);
      this.api.getMedia(this.product.imagen).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          if (this.user.tipo == 'DU') {
            this.setOwnerPage();
          }
          
        },
        error: err => {
          throw new Error(err);
        }
      });
    }else {
      console.log("La imagen ya es una safeUrl");
      this.image = this.product.imagen;
      if (this.user.tipo == 'DU') {
        this.setOwnerPage();
      }
    }
  }

  setOwnerPage(): void {
    this.product.imagen = this.image;
    this.loaderForm.loadFormWithData<Producto>(TYPE_FORMS.CREATE_PRODUCT, this.product);
    this.loaderForm.formSubmitted.subscribe(
      (response: Response) => {
        this.router.navigate(['/dashboard/owner']);
      }
    );
  }

}
