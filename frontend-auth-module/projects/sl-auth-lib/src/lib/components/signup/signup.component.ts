import { Component, ViewChild, inject } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { PasswordMatchValidator } from '../password-match.validator';
@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;
  location:Location;

  formJson: any = {
    controls: [
      {
        name: 'name',
        label: 'Name',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
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
          minlength: "Password should contain minimum of 10 characters",
          pattern:"Password must have at least one uppercase letter, one number, one special character, and be at least 10 characters long"
        },
        validators: {
          required: true,
          minLength: 10,
          pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/
        },
      },
      {
        name: 'confirm_password',
        label: 'Confirm Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        errorMessage: {
          required: "Re-enter password",
          minlength: "Password should contain minimum of 10 characters"
        },
        validators: {
          required: true,
          minLength: 10,
        },
      },
    ],
  };


  constructor(private stateService: StateService) {
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


  navigateToGenerateOtpPage() {
    const formData = this.formLib?.myForm.value
    const passwordsMatch = formData.password === formData.confirm_password;
    if (passwordsMatch) {
      formData.fromPage = 'signup';
      this.stateService.setData(formData);
      this.router.navigate(['/otp']);
    } else {
      alert("Please enter same password");
      console.error('Please enter same password');
    }
 }

  navigateBack() {
    this.location.back();
  }
  
}