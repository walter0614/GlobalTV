import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SystemVariablesService } from './system-variables.service';
import { RoleView } from '../models/role-view.model';
import { UserPerson } from '../models/user-person.model';

@Injectable()
export class UserPersonService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getUserPerson() {
    return this.http.get(this.rootUrl + '/api/Users');
  }


  putUserPerson(id, role) {
    var body = JSON.stringify(role);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Users/' + id, body, { headers: reqHeader });
  }

  registerUserPerson(userP: UserPerson) {
    const body: any = {
      UserName: userP.UserName,
      Id: userP.Id,
      Email: userP.Email,
      FirstName: userP.FirstName,
      LastName: userP.LastName,
      PasswordHash: userP.PasswordHash
    }
    return this.http.post(this.rootUrl + '/api/Users/Register', body);
  }


  deleteUserPerson(id: number) {
    return this.http.delete(this.rootUrl + '/api/Users/' + id);
  }

}
