import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class IndentService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewIndent(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req`);
  }

  CreateIndent(indent:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store/req`,indent);
  }
  ViewIndentStatus(status: string): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req/Istatus?indentStatus=${status}`);
  }

  StatusUpdateIndent(indentId:number,indent:any): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/req/${indentId}`,indent);
  }
}
