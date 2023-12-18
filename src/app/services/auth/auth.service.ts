import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  
  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.isLoggedIn;
 }

 loginCheck(params: any) {
  return this.http.post("http://localhost:5000/auth/login", params)
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