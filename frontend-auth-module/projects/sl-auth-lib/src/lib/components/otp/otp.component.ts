import { Component, Renderer2, inject } from '@angular/core';
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
  otpInput: boolean = false;
  regFormData: any;
  otp!: any;
  checkbox: boolean = false;

  baseApiService: ApiBaseService;
  router: Router;
  timeLeft: number = 60;

  constructor(private stateService: StateService, private renderer:Renderer2) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
  }

  ngOnInit() {
    this.startTimer();
    this.regFormData = this.stateService.getData();
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
    autofocus: true
  };


  handeOtpChange(value: string[]): void {
    const otp = value.join('');
    if (otp.length !== 6) {
      this.otp = "";
    }
  }

  handleFillEvent(value: string): void {
    this.otp = value;
  }

  navigateBack() {
    this.location.back();
  }

  processOTP(action: 'generate' | 'verify') {
    let payload = {
      email: this.regFormData?.email,
      password: this.regFormData?.password,
      name: this.regFormData?.name,
      otp: action === 'verify' ? this.otp : undefined
    };
  
    let selectedApiPath: string = this.regFormData.fromPage === "signup" 
    ? action === 'generate' ? "otpGenerationApiPathForRegistration" : "signUpApiPath" 
    : this.regFormData.fromPage === "reset" 
        ? action === 'generate' ? "otpGenerationApiPathForResetPassword" : "resetPasswordApiPath" 
        : "";

        let reditectionPath: string = this.regFormData.fromPage === "signup" 
    ? this.configData?.redirectRouteOnLoginSuccess 
    : this.regFormData.fromPage === "reset" 
        ? action === 'generate' ? undefined : "/login" 
        : undefined;

if (this.regFormData.fromPage === "reset" && action === 'generate') {
    delete payload.name;
}
  
    this.baseApiService
      .post(
        this.configData?.baseUrl, this.configData?.[selectedApiPath], payload)
      .subscribe((res: any) => {
        alert(res?.message);
        if (action === 'verify' && reditectionPath) {
          this.router.navigateByUrl(reditectionPath);
        } else if (action === 'generate') {
          this.otpInput = true;
          this.startTimer();
        }

        const formContainer = document.querySelector('.login-container') as HTMLElement;
        this.renderer.setStyle(formContainer, 'top', '45%');
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
      } 
    });
  }
}
