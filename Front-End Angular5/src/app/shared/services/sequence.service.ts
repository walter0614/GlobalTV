import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Sequence } from '../models/sequence.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class SequenceService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getSequences(id:number) {
    return this.http.get(this.rootUrl + '/api/Sequences/'+id);
  }

  getRules() {
    return this.http.get(this.rootUrl + '/api/Rules');
  }

  putSequence(id, sequence) {
    var body = JSON.stringify(sequence);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Sequences/' + id, body, { headers: reqHeader });
  }

  registerSequence(object) {
    const body = object;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Sequences', body, { headers: reqHeader });
  }
  deleteSequence(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/Sequences/' + id, { headers: reqHeader });
  }

  putRules(id, rules) {
    var body = JSON.stringify(rules);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Rules/' + id, body, { headers: reqHeader });
  }

  registerRule(object) {
    const body = object;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Rules', body, { headers: reqHeader });
  }
  deleteRule(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/Rules/' + id, { headers: reqHeader });
  }
}
