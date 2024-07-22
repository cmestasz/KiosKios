import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptando este error: ", req);
    if (req.body.status) {
      
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Interceptando error de autenticación: ", error);
        if(error.status === 401) {
          const returnUrl = this.router.url;
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigate(['/login'], { queryParams: {returnUrl} })
        }
        throw error;
      })
    )
  }
}
