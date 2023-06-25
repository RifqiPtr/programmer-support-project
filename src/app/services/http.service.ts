import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private httpClient: HttpClient) {}

  private getFullUrl(url: string): string {
    return this.baseUrl + url;
  }

  public getHttp<T>(url: string): Observable<T> {
    const fullUrl = this.getFullUrl(url);
    return this.httpClient.get<T>(fullUrl);
  }
}