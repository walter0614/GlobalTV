import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Activity } from '../models/activity.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SystemVariablesService } from './system-variables.service';

@Injectable()
export class ActivityService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getActivities() {
    return this.http.get(this.rootUrl + '/api/Activities');
  }
  getActivityTypes() {
    return this.http.get(this.rootUrl + '/api/ActivityTypes');
  }
  getActivityCompetition() {
    return this.http.get(this.rootUrl + '/api/CompetitionActivities');
  }

  putActivity(id, activity) {
    var body = JSON.stringify(activity);
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Activities/' + id, body, { headers: reqHeader });
  }

  registerActivity(activity: Activity) {
    const body: Activity = {
      idActivity: activity.idActivity,
      name: activity.name,
      description: activity.description,
      idActivityType: activity.idActivityType
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Activities', body, { headers: reqHeader });
  }

  registerActivityCompetition(object) {
    const body = object;
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/CompetitionActivities', body, { headers: reqHeader });
  }
  deleteActivityCompetition(id: number){
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.delete(this.rootUrl + '/api/CompetitionActivities/' + id, { headers: reqHeader });
  }
}
