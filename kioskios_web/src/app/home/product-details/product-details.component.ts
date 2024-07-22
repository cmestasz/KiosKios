import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/product';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../../models/user';
import { EMPTY_USER, TYPE_FORMS } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { LoaderFormComponent } from '../../dinamic-form/loader-form/loader-form.component';

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
  user: User;
  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.user = EMPTY_USER;
  }

  ngOnInit(): void {
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
                  this.loadImage();
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
  backHome(): void {
    if (this.user.tipo == 'US') {
      this.router.navigate(['/dashboard/user']);
    } else {
      this.router.navigate(['/dashboard/owner']);
    }
  }
  loadImage(): void {
    if (typeof this.product.imagen == 'string') {
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
    }
  }

  setOwnerPage(): void {
    this.product.imagen = this.image;
    const segments = this.product.tienda.split('/');
    this.product.tienda = segments[segments.length - 2];
    this.loaderForm.loadFormWithData<Producto>(TYPE_FORMS.CREATE_PRODUCT, this.product);
    this.loaderForm.formSubmitted.subscribe(
      (response: Response) => {
        this.router.navigate(['/dashboard/owner']);
      }
    );
  }

}
