import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { catchError, map, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private emailSubject: Subject<string> = new Subject<string>();

  constructor(
    private oAuthService: OAuthService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initConfiguration();
      this.oAuthService.events.subscribe(event => {
        if (event.type === 'discovery_document_loaded') {
          console.log('Documento de descubrimiento cargado.');
        } else if (event.type === 'token_received') {
          console.log('Token recibido.');
          this.emailSubject.next(this.getEmail());
        } else if (event.type === 'token_error') {
          console.log('No se inició sesión con google');
          this.emailSubject.next('');
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
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
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
