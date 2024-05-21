import { NgModule } from '@angular/core';
import { SlAuthLibComponent } from './sl-auth-lib.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SlRoutingRoutingModule } from './sl-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from 'elevate-dynamic-form';

@NgModule({
  declarations: [
    SlAuthLibComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SlRoutingRoutingModule,
    DynamicFormModule,
    HttpClientModule
  ],
  exports: [
    SlAuthLibComponent,
    SlRoutingRoutingModule
  ]
})
export class SlAuthLibModule { }
