import { Component, inject } from '@angular/core';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'lib-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  configData: any;
  endPointService: EndpointService;

  constructor() {
    this.endPointService = inject(EndpointService);
  }

  ngOnInit() {
    this.fetchConfigData();
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
}