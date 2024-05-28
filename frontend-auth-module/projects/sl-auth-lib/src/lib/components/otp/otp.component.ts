import { Component, inject } from '@angular/core';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { EndpointService } from '../../services/endpoint/endpoint.service';
@Component({
  selector: 'lib-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  configData:any;
  endPointService:EndpointService;
  otpInput:boolean = false;

    constructor() { 
    this.endPointService = inject(EndpointService);
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

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: true,
    classList: {
      inputBox: "my-super-box-class",
      input: "my-super-class",
      inputFilled: "my-super-filled-class",
      inputDisabled: "my-super-disable-class",
      inputSuccess: "my-super-success-class",
      inputError: "my-super-error-class"
    }
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

  generateOtp(){
    this.otpInput = true;
  }
}
