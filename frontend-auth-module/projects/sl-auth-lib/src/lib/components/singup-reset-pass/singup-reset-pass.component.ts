import { Component, ViewChild, inject, Input, Renderer2 } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
@Component({
  selector: 'lib-singup-reset-pass',
  templateUrl: './singup-reset-pass.component.html',
  styleUrl: './singup-reset-pass.component.css'
})
export class SingupResetPassComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  mode: 'signup' | 'reset' = 'signup';
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;
  location: Location;
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
          pattern: "Password must have at least one uppercase letter, one number, one special character, and be at least 10 characters long"
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

  constructor(private stateService: StateService, private route: ActivatedRoute
    ,private renderer: Renderer2
  ) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
  }

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'];
    if (this.mode === 'reset') {
      this.formJson.controls = this.formJson.controls.filter((control: any) => control.name !== 'name');
    }
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
      formData.fromPage = this.mode;
      this.stateService.setData(formData);
      this.router.navigate(['/otp']);
    } else {
      alert("Please enter the same password");
      console.error('Please enter the same password');
    }
  }

  navigateBack() {
    this.location.back();
  }

}
