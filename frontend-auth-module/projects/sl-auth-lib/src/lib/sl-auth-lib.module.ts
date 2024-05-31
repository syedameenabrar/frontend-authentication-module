import { NgModule } from '@angular/core';
import { SlAuthLibComponent } from './sl-auth-lib.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SlRoutingRoutingModule } from './sl-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from 'elevate-dynamic-form';
import { LandingComponent } from './components/landing/landing.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatIconModule } from '@angular/material/icon';
import { OtpComponent } from './components/otp/otp.component';
import { NgxOtpInputModule } from "ngx-otp-input";
import { AuthGuard } from './services/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SlAuthLibComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    OtpComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SlRoutingRoutingModule,
    DynamicFormModule,
    HttpClientModule,
    MatIconModule,
    NgxOtpInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SlAuthLibComponent,
    SlRoutingRoutingModule
  ],
  providers:[AuthGuard]
})
export class SlAuthLibModule { }
