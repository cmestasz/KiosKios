import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { OwnerHomeComponent } from './home/owner-home/owner-home.component';
import { AnyHomeComponent } from './home/any-home/any-home.component';
import { HomeComponent } from './home/home.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: AnyHomeComponent
      },
      {
        path: 'user', component: UserHomeComponent
      },
      {
        path: 'owner', component: OwnerHomeComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'google_auth', component: AuthRedirectComponent
  }
];
