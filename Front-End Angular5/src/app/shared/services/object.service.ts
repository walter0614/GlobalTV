import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Object } from '../models/object.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class ObjectService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getObjects() {
    return this.http.get(this.rootUrl + '/api/Objects');
  }
  putObject(id, obj) {
    var body = JSON.stringify(obj);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Objects/' + id, body, { headers: reqHeader });
  }
  registerObject(obj) {
    const body: any = obj;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Objects', body, { headers: reqHeader });
  }
  deleteActivityObject(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/ActivityObjects/' + id, { headers: reqHeader });
  }
  registerObjectActivity(obj) {
    const body: any = obj;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/ActivityObjects', body, { headers: reqHeader });
  }

}
