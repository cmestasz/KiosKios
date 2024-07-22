import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, map, Observable, of, retry } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformid: object
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        const userType = user.tipo;
        if (userType === 'US') {
          if (state.url.startsWith('/dashboard/user')) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        } else if (userType === 'DU') {
          if (state.url.startsWith('/dashboard/owner')) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        } else if (userType === 'AD') {
          if (state.url.startsWith('/dashboard/admin')) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        } else {
          if (isPlatformBrowser(this.platformid)) {
            localStorage.clear();
            this.authService.clear(); 
          }
          
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError(error => {
        console.error('Error al obtener el usuario', error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}

