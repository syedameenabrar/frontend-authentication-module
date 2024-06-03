import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: any, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    const isAuthenticated = !!localStorage.getItem('name');
    const publicRoutes = ['/login', '/signup', '/landing', '/otp', '/reset-password'];

    if (isAuthenticated) {
      if (publicRoutes.includes(state.url)) {
        return this.router.parseUrl('/home');
      }
      return true;
    } else {
      if (!publicRoutes.includes(state.url)) {
        return this.router.parseUrl('/landing');
      }
      return true;
    }
  }
}
