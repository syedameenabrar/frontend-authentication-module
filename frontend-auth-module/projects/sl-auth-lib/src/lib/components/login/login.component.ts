import { Component, ViewChild, inject } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
import { Location } from '@angular/common';


@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  baseApiService: ApiBaseService;
  endPointService:EndpointService;
  router:Router;
  configData:any;
  location:Location;

  formJson: any = {
    controls: [
      {
        name: 'email',
        label: 'Email',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage:{
          required: "Please enter registered email ID",
          email:"Enter a valid email ID"
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
        errorMessage:{
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
    this.location= inject(Location);
  }

  ngOnInit() {
    this.fetchConfigData();
  }

  async fetchConfigData() {
    try {
      this.configData = await this.endPointService.getEndpoint();
    } catch (error) {
      console.error("An error occurred while fetching configData:", error);
    }
  }
  
  submitData() {
    this.baseApiService
      .post(
        this.configData?.baseUrl,
        this.configData?.loginApiPath,
        this.formLib?.myForm.value
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
              localStorage.setItem(key, String(value));
            });
  
            this.router.navigateByUrl(this.configData?.redirectRouteOnLoginSuccess);
          } else {
            alert(res?.message);
          }
        },
        (err: any) => {
          alert(err?.error?.message);
        }
      );
  }
  

  navigateBack() {
    this.location.back();
  }
}