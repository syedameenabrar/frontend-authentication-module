import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  private isPublicRoute(url: string): boolean {
    const publicRoutes = ['/login', '/signup', '/landing', '/otp', '/reset-password'];
    return publicRoutes.includes(url);
  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const isAuthenticated = !!localStorage.getItem('name');

    if (isAuthenticated) {
      if (this.isPublicRoute(state.url)) {
        return this.router.parseUrl('/home');
      }
      return true;
    } else {
      if (!this.isPublicRoute(state.url)) {
        return this.router.parseUrl('/landing');
      }
      return true;
    }
  }
}
