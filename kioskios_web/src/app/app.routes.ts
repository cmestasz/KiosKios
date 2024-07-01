import { Routes } from '@angular/router';
import { DinamicFormComponent } from './dinamic-form/dinamic-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'forms', component: DinamicFormComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];
