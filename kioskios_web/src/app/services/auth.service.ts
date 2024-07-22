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
  private userForRedirect: Subject<User>;

  constructor(
    private googleAuth: GoogleAuthService,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformid: object
  ) {
    this.user = EMPTY_USER;
    this.userForRedirect = new Subject<User>;
    this.userSubject = new BehaviorSubject<User>(this.user);
    if (isPlatformBrowser(platformid)) {
      const userData = localStorage.getItem('user');

      if (userData) {
        try {
          this.user = JSON.parse(userData);
          if (this.user.email) { // si no tiene email es porque está vacío
            this.userSubject.next(this.user);
          }
        } catch (error) {
          console.error("No se pudo obtener los datos de usuario desde el localstorage: ", error);
        }
      }

      this.googleAuth.getEmailObservable().subscribe(email => {
        if (email && email.trim()) {
          this.api.authUserWithEmail(email).subscribe(response => {
            this.user = response;
            this.userSubject.next(this.user);
            this.userForRedirect.next(this.user);
            localStorage.setItem('user', JSON.stringify(response));
          });
        } else {
          console.log('No se pudo obtener el correo electrónico del usuario.');
        }
      });
    }
  }

  signInWithGoogle() {
    this.googleAuth.login();
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  getUserForRedirect(): Observable<User> {
    return this.userForRedirect.asObservable();
  }

  signIn(user: User, token: string) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.userSubject.next(this.user);
  }

  clear() {
    this.user = EMPTY_USER;
    this.userSubject.next(this.user);
  }

  signOut() {
    if (this.user) {
      this.api.unauthUser(this.user.email).subscribe(
        response => {
          if (response) {
            alert("Se ha cerrado la sesión exitosamente");            
            this.user = EMPTY_USER;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.userSubject.next(EMPTY_USER);
          } else {
            alert("No se pudo cerrar sesión");
          }
        });
    }
  }
  getUserLocal(): User {
    if (isPlatformBrowser(this.platformid)) {
      const userData = localStorage.getItem('user');
    let user: User = EMPTY_USER;
    try {
      if (userData) {
        user = JSON.parse(userData);      
      }
    }catch(err){
      throw new Error("No se pudo parsear el usuario");
    }
    return user;
    }
    return EMPTY_USER;
  }

  
}

