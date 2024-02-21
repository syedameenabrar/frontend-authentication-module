import { NgModule } from '@angular/core';
import { SlAuthLibraryComponent } from './sl-auth-library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';



@NgModule({
  declarations: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent
  ],
  imports: [
  ],
  exports: [
    SlAuthLibraryComponent
  ]
})
export class SlAuthLibraryModule { }
