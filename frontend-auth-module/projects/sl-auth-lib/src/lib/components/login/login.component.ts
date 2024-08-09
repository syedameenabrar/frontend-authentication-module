import { Component, ViewChild, inject } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;
  location: Location;
  toastService: ToastService;
  formJson: any = {
    controls: [
      {
        name: 'email',
        label: 'Email',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Please enter registered email ID",
          email: "Enter a valid email ID"
        },
        validators: {
          required: true,
          email: true
        },
      },
      {
        name: 'password',
        label: 'Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        errorMessage: {
          required: "Enter password",
          minlength: "Password should contain minimum of 8 characters"
        },
        validators: {
          required: true,
          minLength: 8,
        },
      },
    ],
  };


  constructor() {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
    this.toastService = inject(ToastService);
  }

  ngOnInit() {
    this.fetchConfigData();
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

  submitData() {
    this.baseApiService
      .post(
        this.configData?.baseUrl,
        this.configData?.loginApiPath,
        this.formLib?.myForm.value
      ).pipe(
        catchError((error) => {
          this.toastService.showToast(error?.error?.message, 'error', 3000, 'top', 'end');
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          if (res?.result) {
            const dataToStore = {
              accToken: res?.result?.access_token,
              refToken: res?.result?.refresh_token,
              ...res?.result?.user
            };

            Object.entries(dataToStore).forEach(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                localStorage.setItem(key, JSON.stringify(value));
              } else {
                localStorage.setItem(key, String(value));
              }
            });

            this.router.navigateByUrl(this.configData?.redirectRouteOnLoginSuccess);
          } else {
            alert(res?.message);
            this.toastService.showToast(res?.message, 'error', 3000, 'top', 'end');
          }
        }
      );
  }

  navigateBack() {
    if (window.history.length < 1) {
      this.location.back();
    } else {
      this.router.navigate(['/landing']);
    }
  }
}