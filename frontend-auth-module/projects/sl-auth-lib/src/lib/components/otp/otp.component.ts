import { Component, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { Subscription, interval } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'lib-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit, OnDestroy {
  configData: any;
  endPointService: EndpointService;
  location: Location;
  otpInput: boolean = false;
  regFormData: any;
  otp: string = '';
  checkbox: boolean = false;
  baseApiService: ApiBaseService;
  router: Router;
  timeLeft: number = 60;
  formContainer: HTMLElement | null = null;
  timerSubscription: Subscription | null = null;
  fromKnownPage: boolean = false;
  config = {
    allowNumbersOnly: true,
    length: 6,
    inputStyles: {
      'width': '46px',
      'height': '46px',
      'border-radius': '8px'
    }
  };

  constructor(private stateService: StateService, private renderer: Renderer2) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
  }

  ngOnInit() {
    this.fetchConfigData();
    this.regFormData = this.stateService.getData();
    this.formContainer = this.renderer.selectRootElement('.login-container', true);
    this.fromKnownPage = !!this.regFormData?.fromPage;
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  fetchConfigData() {
    this.endPointService.getEndpoint().pipe(
      catchError((error) => {
        alert("An error occurred while fetching configData");
        throw error
      })
    ).subscribe(data => {
      this.configData = data;
    });
  }

  navigateBack() {
    if (this.fromKnownPage) {
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
          if (action === 'verify' && res?.result) {
              const dataToStore = {
                accToken: res?.result?.access_token,
                refToken: res?.result?.refresh_token,
                ...res?.result?.user
              };
    
              Object.entries(dataToStore).forEach(([key, value]) => {
                localStorage.setItem(key, String(value));
              });

              this.router.navigateByUrl(this.configData?.redirectRouteOnLoginSuccess);
          } else if (action === 'generate') {
            this.otpInput = true;
            this.startTimer();
          } else {
            alert(res?.message || `An error occurred during ${action} OTP`);
          }
          if (this.formContainer) {
            this.renderer.setStyle(this.formContainer, 'top', '45%');
          }
        }
      );
  }

  startTimer(): void {
    this.timeLeft = 60;
    this.unsubscribeTimer();

    this.timerSubscription = interval(1000).pipe(
      catchError((error) => {
        this.unsubscribeTimer();
        throw error;
      })
    ).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.unsubscribeTimer();
      }
    });
  }

  unsubscribeTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  handleFillEvent(value: string): void {
    this.otp = value;
  }
  
  onOtpChange(otp:any) {
    this.otp = otp;
  }

  isOtpValid(): boolean {
    return this.otp?.length === 6 && this.checkbox;
  }
}
