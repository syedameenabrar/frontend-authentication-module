import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/guard/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OtpComponent } from './components/otp/otp.component';

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'signup', component: SignupComponent},
  {path:'landing', component: LandingComponent},
  {path:'reset-password', component: ResetPasswordComponent},
  {path:'otp', component: OtpComponent},
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlRoutingRoutingModule { }
