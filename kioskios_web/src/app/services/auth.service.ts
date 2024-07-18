import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { response } from 'express';
import { Observable, of, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | undefined;
  private userSubject: Subject<User | undefined> = new Subject<User | undefined>();

  constructor(
    private googleAuth: GoogleAuthService,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformid: object
  ) {
    if (isPlatformBrowser(platformid)) {
      const userData = localStorage.getItem('user');
      if (userData)
        try {
          this.user = JSON.parse(userData);
          if(this.user)
            this.api.getUser(this.user.email).subscribe(response => {
              console.log("Usuario autenticado desde local storage: ", response
          )});
        } catch (error) {
          console.error("No se pudo obtener los datos de usuario desde el localstorage: ", error);
        }
      this.googleAuth.getEmailObservable().subscribe(email => {
        if (email) {
          this.api.getUser(email).subscribe(response => {
            this.user = response;
            this.userSubject.next(this.user);
            localStorage.setItem('user', JSON.stringify(response));
          });
        } else {
          console.error('No se pudo obtener el correo electrónico del usuario.');
          this.userSubject.next(undefined);
        }
      });
    }
  }

  signInWithGoogle() {
    this.googleAuth.login();
  }

  getUser(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  getUserAsObservable(): Observable<User | undefined> {
    return of(this.user);
  }

  getUserLoaded(): User | undefined {
    return this.user;
  }

  signIn(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(this.user);
  }

}
