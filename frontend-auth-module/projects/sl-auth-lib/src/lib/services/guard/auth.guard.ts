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
    if (isAuthenticated) {
      if (state?.url === '/login') {
        return this.router.parseUrl('/home');
      }
      return true;
    } else {
      return this.router.parseUrl('/login'); 
    }
  }
}
