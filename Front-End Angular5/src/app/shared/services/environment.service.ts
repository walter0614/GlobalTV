import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Environment } from '../models/environment.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class EnvironmentService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getEnvironments() {
    return this.http.get(this.rootUrl + '/api/Environments');
  }
  putEnvironment(id, environment) {
    var body = JSON.stringify(environment);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Environments/' + id, body, { headers: reqHeader });
  }
  registerEnvironment(environment: Environment) {
    const body: any = {
      idEnvironment: environment.idEnvironment,
      name: environment.name
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Environments', body, { headers: reqHeader });
  }
  getEnvironmentsActivities() {
    return this.http.get(this.rootUrl + '/api/ActivityEnvironments');
  }
  deleteEnvironment(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/ActivityEnvironments/' + id, { headers: reqHeader });
  }
  registerActivityEnvironment(environmentActivity) {
    const body: any = {
      idActivity: environmentActivity.idActivity,
      idEnvironment: environmentActivity.idEnvironment
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/ActivityEnvironments', body, { headers: reqHeader });
  }
}
