import { Component, inject } from '@angular/core';
import { EndpointService } from '../../services/endpoint/endpoint.service';
@Component({
  selector: 'lib-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  configData:any;
  endPointService:EndpointService;

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

}
