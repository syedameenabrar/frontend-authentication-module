import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly publicRoutes = ['/login', '/signup', '/landing', '/otp', '/reset-password'];

  constructor(private router: Router) {}

  private isPublicRoute(url: string): boolean {
    return this.publicRoutes.includes(url);
  }

  private isAuthenticated(): boolean {
    return !!localStorage.getItem('name');
  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    const url = state.url;
    const authenticated = this.isAuthenticated();
    const publicRoute = this.isPublicRoute(url);

    if (authenticated) {
      return publicRoute ? this.router.parseUrl('/home') : true;
    } else {
      return publicRoute ? true : this.router.parseUrl('/landing');
    }
  }
}
