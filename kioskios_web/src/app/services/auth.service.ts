import { Injectable } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { response } from 'express';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | undefined;
  private userSubject: Subject<User | undefined> = new Subject<User | undefined>();

  constructor(
    private googleAuth: GoogleAuthService,
    private api: ApiService
  ) { 
    const userData = localStorage.getItem('user');
    if(userData)
      this.user = JSON.parse(userData);
    this.googleAuth.getEmailObservable().subscribe(email => {
      if (email) {
        this.api.getUser(email).subscribe(response => {
          this.user = response;
          this.userSubject.next(this.user);
          localStorage.setItem('user', JSON.stringify(response));
        });
      } else {
        console.error('No se pudo obtener el correo elec  trónico del usuario.');
        this.userSubject.next(undefined); 
      }
    });
  }

  signInWithGoogle() {
    this.googleAuth.login();
  }

  getUser(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  getUserLoaded(): User | undefined  {
    return this.user;
  }

  signIn(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(this.user);
  }

}
