import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  
  constructor() { }

  isAuthenticated() {
    return this.isLoggedIn;
 }
}

export const LoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ):
  | boolean
  | UrlTree => {
     const isLogged = inject(AuthService).isAuthenticated();
  
     if(!isLogged) {
        return inject(Router).createUrlTree(['/', 'login']);
     }
  
     return true;
  };