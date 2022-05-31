import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewIssue(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issue`);
  }

  CreateIssue(issue:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/issue`,issue);
  }
  ViewIssueStatus(status: string): Observable<any> {
    return this.http.get(`${this.url}/api/v1/issue/status?status=${status}`);
  }

  StatusUpdateIssue(issueId:number,issue:any): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/issue/${issueId}`,issue);
  }

  CreateUsageItem(usage:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/itemusage`,usage);
  }

  ViewUsageItem(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/itemusage/data`);
  }
  ViewDepartUsageItem(departmentName: any): Observable<any> {
    return this.http.get(`${this.url}/api/v1/itemusage?name=${departmentName}`);
  }
}
