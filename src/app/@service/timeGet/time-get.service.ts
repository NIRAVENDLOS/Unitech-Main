import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class TimeGetService {

  constructor(private http: HttpClient) { }
  url = `${apiUrl.url}/unitech`;

  ViewTime(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/user/time`);
  }
}
