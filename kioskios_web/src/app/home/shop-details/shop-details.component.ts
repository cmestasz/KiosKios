import { Component, ViewChild } from '@angular/core';
import { Tienda } from '../../models/tienda';
import { EMPTY_USER, TYPE_FORMS } from '../../constants';
import { User } from '../../models/user';
import { LoaderFormComponent } from '../../dinamic-form/loader-form/loader-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [LoaderFormComponent, ProductListComponent],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent {

  tienda!: Tienda;
  user: User;
  @ViewChild(LoaderFormComponent) loaderForm!: LoaderFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
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
              this.api.getShopById(id).subscribe(
                tienda => {
                  console.log("Una entrega de tienda: ", tienda);
                  this.tienda = tienda;
                  if (this.user.tipo == 'DU') {
                    this.setOwnerPage();
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
  backHome(): void {
    if (this.user.tipo == 'US') {
      this.router.navigate(['/dashboard/user']);
    } else {
      this.router.navigate(['/dashboard/owner']);
    }
  }

  setOwnerPage(): void {
    this.loaderForm.loadFormWithData<Tienda>(TYPE_FORMS.CREATE_SHOP, this.tienda);
    this.loaderForm.formSubmitted.subscribe(
      (response: Response) => {
        this.router.navigate(['/dashboard/owner']);
      }
    );
  }

}
