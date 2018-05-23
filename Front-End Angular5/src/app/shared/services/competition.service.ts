import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Competition } from '../models/competition.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class CompetitionService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getCompetitions() {
    return this.http.get(this.rootUrl + '/api/Competitions');
  }
  putCompetition(id, competition) {
    var body = JSON.stringify(competition);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Competitions/' + id, body, { headers: reqHeader });
  }
  registerCompetition(competition: Competition) {
    const body: Competition = {
      idCompetition: competition.idCompetition,
      name: competition.name
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Competitions', body, { headers: reqHeader });
  }
}
