import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { OwnerHomeComponent } from './home/owner-home/owner-home.component';
import { AnyHomeComponent } from './home/any-home/any-home.component';
import { HomeComponent } from './home/home.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: AnyHomeComponent, title: 'KiosKios - Tu tienda virtual'
      },
      {
        path: 'user', component: UserHomeComponent, title: 'Home - Usuario', children: [
          
        ]
      },
      {
        path: 'user/product/:id', component: ProductDetailsComponent, title: 'Ver detalles del productoA'
      },
      {
        path: 'owner', component: OwnerHomeComponent, title: 'Home - Dueño'
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
