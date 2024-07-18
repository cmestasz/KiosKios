import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { response } from 'express';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY_USER } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private userSubject: BehaviorSubject<User>;

  constructor(
    private googleAuth: GoogleAuthService,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformid: object
  ) {
    this.user = EMPTY_USER;
    this.userSubject = new BehaviorSubject<User>(this.user);
    if (isPlatformBrowser(platformid)) {
      const userData = localStorage.getItem('user');

      if (userData) {
        try {
          this.user = JSON.parse(userData);
          console.log("Valor de usuario extraído del localStorage: ", this.user);
          console.log("User es vacio: ", this.user.email === undefined);
          if (this.user.email) { // si no tiene email es porque está vacío
            this.userSubject.next(this.user);
            //this.api.authUserWithEmail(this.user.email).subscribe(response => {
              //console.log("Usuario autenticado desde local storage: ", response
             // )
           // });
          }
        } catch (error) {
          console.error("No se pudo obtener los datos de usuario desde el localstorage: ", error);
        }
      }

      this.googleAuth.getEmailObservable().subscribe(email => {
        if (email) {
          console.log("Email recibido por Google: ", email);
          this.api.authUserWithEmail(email).subscribe(response => {
            this.user = response;
            this.userSubject.next(this.user);
            console.log("Configurando objeto actual en el servicio de autenticación: ", response);
            localStorage.setItem('user', JSON.stringify(response));
          });
        } else {
          console.error('No se pudo obtener el correo electrónico del usuario.');
          this.user = EMPTY_USER;
          this.userSubject.next(EMPTY_USER);
        }
      });
    }
  }

  signInWithGoogle() {
    this.googleAuth.login();
  }

  getUser(): Observable<User> {
    console.log("Enviando el usuario como observable: ", this.user);
    return this.userSubject.asObservable();
  }

  signIn(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(this.user);
  }

  signOut() {
    if (this.user) {
      this.api.unauthUser(this.user.email).subscribe(
        response => {
          console.log("Se logró cerrar la sesión ", response);
          if (response) {
            console.log("Logout actual user");
            this.user = EMPTY_USER;
            console.log("Eliminando del localStorage  ");
            localStorage.removeItem('user');
            console.log("Actualizando subject del usuario");
            this.userSubject.next(EMPTY_USER);
          }
        });
    }
  }

}
