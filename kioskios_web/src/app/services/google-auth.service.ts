import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private emailSubject: Subject<string | null> = new Subject<string | null>();

  constructor(
    private oAuthService: OAuthService
  ) { 
    this.initConfiguration();
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        const email = this.getEmail();
        this.emailSubject.next(email);
      }
    });
  }


  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '796586920531-226rvtkd7j5blcesec4qd60gjbru271m.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/google_auth',
      scope: 'openid profile email'
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
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
