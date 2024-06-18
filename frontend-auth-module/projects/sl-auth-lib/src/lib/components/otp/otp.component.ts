import { Component, Renderer2, inject } from '@angular/core';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { Subscription, catchError, interval } from 'rxjs';

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
  formContainer: HTMLElement | null = null;

  constructor(private stateService: StateService, private renderer: Renderer2) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
  }

  ngOnInit() {
    this.startTimer();
    this.regFormData = this.stateService.getData();
    this.fetchConfigData();
    this.formContainer = this.renderer.selectRootElement('.login-container', true);
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

  handleOtpChange(value: string[]): void {
    const otp = value.join('');
    if (otp.length !== 6) {
      this.otp = "";
    }
  }

  handleFillEvent(value: string): void {
    this.otp = value;
  }

  navigateBack() {
    if (window.history.length < 1) {
      this.location.back();
    } else {
      this.router.navigate(['/landing']);
    }
  }

  processOTP(action: 'generate' | 'verify') {
    const isSignup = this.regFormData.fromPage === "signup";
    const isReset = this.regFormData.fromPage === "reset";

    let payload = {
      email: this.regFormData?.email,
      password: this.regFormData?.password,
      name: isSignup ? this.regFormData?.name : null,
      otp: action === 'verify' ? this.otp : null
    };

    if (isReset && action === 'generate') {
      delete payload.name;
    }

    const apiPaths = {
      signup: {
        generate: "otpGenerationApiPathForRegistration",
        verify: "signUpApiPath"
      },
      reset: {
        generate: "otpGenerationApiPathForResetPassword",
        verify: "resetPasswordApiPath"
      }
    };

    type ActionType = keyof typeof apiPaths;
    const actionType: ActionType | '' = isSignup ? 'signup' : isReset ? 'reset' : '';

    const selectedApiPath = actionType ? apiPaths[actionType]?.[action] : "";

    const redirectionPath = isSignup
      ? this.configData?.redirectRouteOnLoginSuccess
      : isReset
        ? action === 'generate' ? undefined : "/login"
        : undefined;

    this.baseApiService
      .post(this.configData?.baseUrl, this.configData?.[selectedApiPath], payload)
      .pipe(
        catchError((error) => {
          alert(error?.error?.message || `An error occurred during ${action} OTP`);
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          alert(res?.message);
          if (action === 'verify' && redirectionPath) {
            this.router.navigateByUrl(redirectionPath);
          } else if (action === 'generate') {
            this.otpInput = true;
            this.startTimer();
          } else {
            console.error(`An error occurred during ${action} OTP`);
          }

          if (this.formContainer) {
            this.renderer.setStyle(this.formContainer, 'top', '45%');
          }
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
