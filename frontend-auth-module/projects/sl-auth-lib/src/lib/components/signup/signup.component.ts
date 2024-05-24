import { Component, ViewChild, inject } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  baseApiService: ApiBaseService;
  endPointService:EndpointService;
  router:Router;
  configData:any;

  formJson: any = {
    controls: [
      {
        name: 'name',
        label: 'Name',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage:{
          required: "Enter Name"
        },
        validators: {
          required: true
        },
      },
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
      {
        name: 'password',
        label: 'Confirm Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        errorMessage:{
          required: "Re-enter password",
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
        this.configData?.baseUrl,this.configData?.loginApiPath,this.formLib?.myForm.value)
      .subscribe((res: any) => {
        if (res?.message == "User logged in successfully.") {
          alert(res?.message);
          localStorage.setItem('accToken',res?.result?.access_token);
          localStorage.setItem('refToken',res?.result?.refresh_token);
          localStorage.setItem('email',res?.result?.user?.email);
          localStorage.setItem('name',res?.result?.user?.name);
          localStorage.setItem('created_at',res?.result?.user?.created_at);
          localStorage.setItem('about',res?.result?.user?.about);
          localStorage.setItem('gender',res?.result?.user?.gender);
          localStorage.setItem('id',res?.result?.user?.id);
          localStorage.setItem('image',res?.result?.user?.image);
          localStorage.setItem('languages',res?.result?.user?.languages);
          localStorage.setItem('location',res?.result?.user?.location);
          localStorage.setItem('organization',res?.result?.user?.organization);
          localStorage.setItem('organization_id',res?.result?.user?.organization_id);
          localStorage.setItem('preferred_language',res?.result?.user?.preferred_language);
          localStorage.setItem('roles',res?.result?.user?.roles);
          localStorage.setItem('share_link',res?.result?.user?.share_link);
          localStorage.setItem('status',res?.result?.user?.status);
          localStorage.setItem('user_roles',res?.result?.user?.user_roles);
          localStorage.setItem('deleted_at',res?.result?.user?.deleted_at);
          localStorage.setItem('created_at',res?.result?.user?.created_at);
          this.router.navigateByUrl(this.configData?.redirectRouteOnLoginSuccess);
        } else {
          alert(res?.message);
        }
      },
    (err:any) => {
      alert(err?.error?.message);
    }
    );
  }
}