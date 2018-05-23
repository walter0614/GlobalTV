import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class PatientService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;


  getPlayers() {
    return this.http.get(this.rootUrl + '/api/players');
  }

  getPlayerHistoryById(id:number) {
    return this.http.get(this.rootUrl + '/api/PlayerHistories/'+id);
  }

  registerHistoryPlayer(object) {
    const body = object;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/PlayerHistories', body, { headers: reqHeader });
  }
  deleteHistoryPlayer(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/PlayerHistories/' + id, { headers: reqHeader });
  }


}
