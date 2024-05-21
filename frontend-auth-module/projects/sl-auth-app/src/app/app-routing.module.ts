import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ObservationComponent } from './components/observation/observation.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from 'projects/sl-auth-lib/src/public-api';
const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate: [AuthGuard] },
  {path:'observation', component:ObservationComponent,canActivate: [AuthGuard] },
  {path:'solution', component:SolutionComponent,canActivate: [AuthGuard] },
  {path:'contact', component:ContactComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
