import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiBaseService } from './base-api/api-base.service';
import { EndpointService } from './endpoint/endpoint.service';
import { ToastService } from './toast/toast.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;
  toastService: ToastService;

  constructor() {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.fetchConfigData();
    this.toastService = inject(ToastService);
  }

  async fetchConfigData() {
    this.endPointService.getEndpoint().pipe(
      catchError((error) => {
        this.toastService.showToast('An error occurred while fetching configData', 'error', 3000, 'top', 'end')
        throw error
      })
    ).subscribe(data => {
      this.configData = data;
    });
  }

  login(): boolean {
    if (localStorage.getItem('name')) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    const payload = {
      refresh_token: localStorage?.getItem('refToken')
    }

    this.baseApiService
      .post(
        this.configData?.baseUrl,
        this.configData?.logoutApiPath,
        payload
      ).pipe(
        catchError((error) => {
          this.toastService.showToast(error?.error?.message || `An error occurred during logout`, 'error', 3000, 'top', 'end');
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          if (res?.responseCode === "OK") {
            localStorage.clear();
            this.router.navigate(['/landing']);
          } else {
            this.toastService.showToast(res?.message || `Logout unsuccessful`, 'error', 3000, 'top', 'end');
          }
        }
      );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
