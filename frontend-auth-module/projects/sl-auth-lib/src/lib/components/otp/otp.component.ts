import { Component, inject } from '@angular/core';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'lib-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  configData: any;
  endPointService: EndpointService;
  location: Location;
  otpInput: boolean = true;
  regFormData: any;
  otp!: any;
  checkbox:boolean = false;

  baseApiService: ApiBaseService;
  router: Router;
  timeLeft: number = 60;

  constructor(private stateService: StateService) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
  }

  ngOnInit() {
    this.startTimer();
    this.regFormData = this.stateService.getData();
    if (this.regFormData) {
      console.log('Received state data:', this.regFormData);
    } else {
      console.error('No state data found');
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

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    // classList: {
    //   inputBox: "my-super-box-class",
    //   input: "my-super-class",
    //   inputFilled: "my-super-filled-class",
    //   inputDisabled: "my-super-disable-class",
    //   inputSuccess: "my-super-success-class",
    //   inputError: "my-super-error-class"
    // }
  };

  handleFillEvent(value: string): void {
    this.otp = value;
  }

  navigateBack() {
    this.location.back();
  }

  generateOTP() {
    console.log(this.regFormData)
    let payload = {
      email: this.regFormData?.email,
      password: this.regFormData?.password,
      name: this.regFormData?.name,
    }

    let selectedApiPath: string;
    if (this.regFormData.fromPage === "signup") {
      selectedApiPath = "otpGenerationApiPathForRegistration"
    } else if (this.regFormData.fromPage === "reset") {
      selectedApiPath = "otpGenerationApiPathForResetPassword"
      delete payload.name;
    }
    else {
      selectedApiPath = "";
    }

    this.baseApiService
      .post(
        this.configData?.baseUrl, this.configData?.[selectedApiPath], payload)
      .subscribe((res: any) => {
        this.otpInput = true;
        alert(res?.message);
        this.startTimer();
      },
        (err: any) => {
          alert(err?.error?.message);
        }
      );
  }


  verifyOTP() {
    let payload = {
      email: this.regFormData?.email,
      password: this.regFormData?.password,
      name: this.regFormData?.name,
      otp: this.otp
    }
    let selectedApiPath: string;
    let reditectionPath: string;

    if (this.regFormData.fromPage === "signup") {
      selectedApiPath = "signUpApiPath";
      reditectionPath = this.configData?.redirectRouteOnLoginSuccess
    } else if (this.regFormData.fromPage === "reset") {
      selectedApiPath = "resetPasswordApiPath";
      delete payload.name;
      reditectionPath = "/login"
    }
    else {
      selectedApiPath = "";
    }

    this.baseApiService
      .post(
        this.configData?.baseUrl, this.configData?.[selectedApiPath], payload)
      .subscribe((res: any) => {
        alert(res?.message);
        this.router.navigateByUrl(reditectionPath);
      },
        (err: any) => {
          alert(err?.error?.message);
        }
      );
  }

  startTimer() {
    this.timeLeft = 60;
    interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.intervalSubscription.unsubscribe();
      }
    });
  }
}
