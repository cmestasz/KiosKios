import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { OwnerHomeComponent } from './home/owner-home/owner-home.component';
import { AnyHomeComponent } from './home/any-home/any-home.component';
import { HomeComponent } from './home/home.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { AddShopComponent } from './home/owner-home/add-shop/add-shop.component';
import { AddItemComponent } from './home/owner-home/add-item/add-item.component';
import { FilterUserRouteComponent } from './home/filter-user-route/filter-user-route.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: AnyHomeComponent, title: 'KiosKios - Tu tienda virtual'
      },
      {
        path: 'dashboard', component: FilterUserRouteComponent, children: [
          {
            path: 'user', children: [
              {
                path: '', title: 'Home - Usuario', component: UserHomeComponent
              },
              {
                path: 'product/:id', component: ProductDetailsComponent, title: 'Ver detalles del producto'
              }
            ]
          },
          {
            path: 'owner', children: [
              {
                path: '', component: OwnerHomeComponent, title: 'Home - Dueño'
              },
              {
                path: 'add-shop', component:  AddShopComponent, title: 'Agregar tienda'
              },
              {
                path: 'add-item', component: AddItemComponent, title: 'Agregar producto'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'login', component: LoginComponent, title: 'KiosKios - Login'
  },
  {
    path: 'register', component: RegisterComponent, title: 'KiosKios - Register'
  },
  {
    path: 'google_auth', component: AuthRedirectComponent, title: 'Redirecting'
  }
];
