import { Inject, Injectable } from '@angular/core';
import { LIBRARY_CONFIG, LibraryConfig } from '../../config/LibraryConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getEndpoint(): Observable<any> {
    return this.config.pipe(
      map((data: any) => {
        this.configData = data;
        return this.configData;
      })
    );
  }
}