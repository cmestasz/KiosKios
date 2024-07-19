import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { platform } from 'os';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private emailSubject: Subject<string | null> = new Subject<string | null>();

  constructor(
    private oAuthService: OAuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initConfiguration();
      this.oAuthService.events.subscribe(event => {
        console.log("Evento de google capturado: ", event);
        if (event.type === 'discovery_document_loaded') {
          console.log('Documento de descubrimiento cargado.');
        } else if (event.type === 'token_received') {
          console.log('Token recibido.');
          const email = this.getEmail();
          this.emailSubject.next(email);
        } else if (event.type === 'token_expires') {
          console.log('Token expirado.');
        } else if (event.type === 'session_terminated') {
          console.log('Sesión terminada.');
        } else if (event.type === 'token_error') {
          console.log('No se inició sesión con google');
          this.router.navigate(['/']);
        }
      });
    }
  }


  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '796586920531-3e0tljrd10uv2115ggm88p88e4o4vcq2.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/google_auth',
      scope: 'openid profile email'
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        console.log('Token válido encontrado.');
        const email = this.getEmail();
        this.emailSubject.next(email);
      } else {
        console.log('No se encontró un token válido.');
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();

  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getEmail(): string {
    return this.oAuthService.getIdentityClaims()['email'];
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }
  getEmailObservable() {
    return this.emailSubject.asObservable();
  }

}
