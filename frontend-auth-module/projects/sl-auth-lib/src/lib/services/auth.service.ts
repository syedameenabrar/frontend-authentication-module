import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiBaseService } from './base-api/api-base.service';
import { EndpointService } from './endpoint/endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;

  constructor() {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.fetchConfigData();

  }


  async fetchConfigData() {
    try {
      this.configData = await this.endPointService.getEndpoint();
    } catch (error) {
      console.error("An error occurred while fetching configData:", error);
    }
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
          alert(error?.error?.message);
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          if (res?.responseCode == "OK") {
            localStorage.clear();
            this.router.navigate(['/landing']);
          } else {
            alert(res?.message);
          }
        }
      );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
