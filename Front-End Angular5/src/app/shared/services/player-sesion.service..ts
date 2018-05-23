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
export class PlayerSesionService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;


  getPlayerSesionById(id:number) {
    return this.http.get(this.rootUrl + '/api/PlayerSesions/'+id);
  }


}
