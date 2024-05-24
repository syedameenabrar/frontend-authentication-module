import { Inject, Injectable } from '@angular/core';
import { LIBRARY_CONFIG, LibraryConfig } from '../../config/LibraryConfig';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  public configData: any;

  constructor(@Inject(LIBRARY_CONFIG) public config: any, private http: HttpClient) { 
    this.config.subscribe((data: any) => {
      this.configData = data;
    });
  }

  async getEndpoint(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.config.subscribe((data: any) => {
        this.configData = data;
        resolve(this.configData);
      }, (error:any) => {
        reject(error);
      });
    });
  }
}
