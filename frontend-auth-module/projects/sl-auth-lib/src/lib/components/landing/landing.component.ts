import { Component, inject } from '@angular/core';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { catchError } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
@Component({
  selector: 'lib-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  configData: any;
  endPointService: EndpointService;
  toastService: ToastService;
  constructor() {
    this.endPointService = inject(EndpointService);
    this.toastService = inject(ToastService);
  }

  ngOnInit() {
    this.fetchConfigData();
  }

  fetchConfigData() {
    this.endPointService.getEndpoint().pipe(
      catchError((error) => {
        this.toastService.showToast('An error occurred while fetching configData', 'error', 3000, 'top', 'end')
        throw error
      })
    ).subscribe(data => {
      this.configData = data;
    });
  }
}