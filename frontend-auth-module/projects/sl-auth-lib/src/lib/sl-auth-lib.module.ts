import { NgModule } from '@angular/core';
import { SlAuthLibComponent } from './sl-auth-lib.component';
import { LoginComponent } from './components/login/login.component';
import { SlRoutingRoutingModule } from './sl-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from 'elevate-dynamic-form';
import { LandingComponent } from './components/landing/landing.component';
import { MatIconModule } from '@angular/material/icon';
import { OtpComponent } from './components/otp/otp.component';
import { AuthGuard } from './services/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingupResetPassComponent } from './components/singup-reset-pass/singup-reset-pass.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ModelComponent } from './components/shared/component/model/model.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    SlAuthLibComponent,
    LoginComponent,
    LandingComponent,
    OtpComponent,
    SingupResetPassComponent,
    ModelComponent
  ],
  imports: [
    CommonModule,
    SlRoutingRoutingModule,
    DynamicFormModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    MatDialogModule
  ],
  exports: [
    SlAuthLibComponent,
    SlRoutingRoutingModule
  ],
  providers:[AuthGuard]
})
export class SlAuthLibModule { }