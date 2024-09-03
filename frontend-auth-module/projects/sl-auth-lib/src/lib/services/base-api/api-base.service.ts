import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  configData!: any;

  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine);
  constructor(private http: HttpClient, private toast: ToastService) {
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
  }
  private updateOnlineStatus(isOnline: boolean): void {
    this.onlineStatus$.next(isOnline);
  }
  private isOnline(): boolean {
    return this.onlineStatus$.value;
  }
  private handleOffline(): Observable<never> {
    this.toast.showToast('You are offline, please connect to a network', 'error', 3000, 'top', 'end');
    return throwError(() => ({
      status: 0,
      error: { message: 'You are offline' },
    }));
  }

  get<T>(baseURL:string, url: string, params?: HttpParams): Observable<T> {
    if (!this.isOnline()) {
      return this.handleOffline();
    }
    return this.http.get<T>(baseURL + url, { params });
  }

  post<T>(baseURL:string, url: string, body: any, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      return this.handleOffline();
    }
    return this.http.post<T>(baseURL + url, body, { headers });
  }

  put<T>(baseURL:string, url: string, body: any, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      return this.handleOffline();
    }
    return this.http.put<T>(baseURL + url, body, { headers });
  }

  delete<T>(baseURL:string, url: string): Observable<T> {
    if (!this.isOnline()) {
      return this.handleOffline();
    }
    return this.http.delete<T>(baseURL + url);
  }
}