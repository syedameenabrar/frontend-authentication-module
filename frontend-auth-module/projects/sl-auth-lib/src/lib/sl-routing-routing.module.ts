import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/guard/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OtpComponent } from './components/otp/otp.component';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[AuthGuard] },
  {path:'signup', component: SignupComponent, canActivate:[AuthGuard] },
  {path:'landing', component: LandingComponent, canActivate:[AuthGuard] },
  {path:'reset-password', component: ResetPasswordComponent, canActivate:[AuthGuard] },
  {path:'otp', component: OtpComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SlRoutingRoutingModule { }
