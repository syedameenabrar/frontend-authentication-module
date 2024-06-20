import { Component } from '@angular/core';
import { AuthService } from 'projects/sl-auth-lib/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private AuthService:AuthService){}
  logout(){
    this.AuthService.logout();
  }
}
