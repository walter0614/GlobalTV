import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { History } from '../models/history.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;


  registerHistory(history: History) {
    const body: History = {
      Id: history.Id,
      PlayerHistory: history.PlayerHistory,
      Sequence: history.Sequence,
      idHistory: history.idHistory,
      Name: history.Name
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Histories', body, { headers: reqHeader });
  }

  putHistory(id, history) {
    var body = JSON.stringify(history);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Histories/' + id, body, { headers: reqHeader });
  }

  getHistories() {
    return this.http.get(this.rootUrl + '/api/Histories');
  }

  getHistoryById(id: number) {
    return this.http.get(this.rootUrl + '/api/Histories/'+id);
  }


}
