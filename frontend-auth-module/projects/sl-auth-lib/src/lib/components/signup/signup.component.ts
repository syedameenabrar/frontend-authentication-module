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
        name: 'confirm-password',
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
let formData = this.formLib?.myForm.value
    let payload = {
      email: formData?.email,
      password:formData?.password
    }

    this.baseApiService
      .post(
        this.configData?.baseUrl,this.configData?.otpValidationApiPath,payload)
      .subscribe((res: any) => {
        if (res?.message == "OTP has been sent to your registered email ID. Please enter the number to update your password.") {
          alert(res?.message);
          this.router.navigateByUrl('/otp');
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