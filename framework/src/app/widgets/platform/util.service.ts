import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public accountName: string;
  public appName: string;
  public taskName: string;
  private userTaskId: string;
  private isTaskLevel: boolean = false;
  private serviceURL: string;

  constructor(private http: HttpClient) {
    const pathSplittedArray = location.pathname.split('/');
    this.accountName = pathSplittedArray[1];
    let userTaskId = pathSplittedArray[2];
    try {
      let decodeAppTask = atob(userTaskId).split("#");
      if(decodeAppTask.length == 3){
        this.isTaskLevel = true;
        this.appName = decodeAppTask[1];
        this.taskName = decodeAppTask[2];
        this.userTaskId = userTaskId;
      }else{
        this.appName = userTaskId;
      }
    } catch (error) {
      this.appName = userTaskId
    }
    this.serviceURL = `${environment.serviceURL}`;
  }

  invokeAPI(path: string, method: string, request?: any, requestHeader?: any, appName: string = (this.isTaskLevel ? this.userTaskId : this.appName)): Observable<HttpResponse<Object>> {
    const url = this.serviceURL + '/' + this.accountName + '/' + appName + '/action/api' + path;
    const httpHeaders = new HttpHeaders(Object.assign(requestHeader || {}, this.getDefaultHeaders()));
    return this.getHttpService(url, method, httpHeaders, request);
  }

  private getDefaultHeaders(){
    let defaultHeader = {
      //'is-external-call': 'true',
      'XSRF-TOKEN' : this.getCookieValue("XSRF-TOKEN"),
      'X-XSRF-TOKEN' : this.getCookieValue("X-XSRF-TOKEN"),
      'ep-auth0-id' : this.getCookieValue("ep-auth0-Token"),
      'ep-sessionid' : this.getCookieValue("X-XSRF-TOKEN"),
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;charset=UTF-8',
      'ep-client' : 'eportal-web-ui-service',
      'accessedTimezone' : new Date() + '',
      'ep-accountname': this.accountName, 
      'ep-appname': this.appName,
      'ep-author': this.getCookieValue("ep-author")
    };
    if(this.userTaskId){
      defaultHeader['ep-user-task-id'] = this.userTaskId;
    }
    return defaultHeader;
  }

  private getCookieValue(key: string): string {
    let b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  private getHttpService(url: string, method: string, httpHeaders: HttpHeaders, requestData: any): Observable<HttpResponse<Object>> {
    switch (method) {
        case 'GET': return this.http.get(url, {observe: 'response', params: requestData, headers: httpHeaders});
        case 'POST': return this.http.post(url, requestData, {observe: 'response', headers: httpHeaders});
        case 'PUT': return this.http.put(url, requestData, {observe: 'response', headers: httpHeaders});
        case 'DELETE': return this.http.delete(url, {observe: 'response', params: requestData, headers: httpHeaders});
        default: throw {message: 'Invalid Method'}
    }
  }

}