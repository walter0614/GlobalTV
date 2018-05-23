import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Role } from '../models/role.model';
import { SystemVariablesService } from './system-variables.service';
import { RoleView } from '../models/role-view.model';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient, private system: SystemVariablesService) { }
  readonly rootUrl = this.system.rootUrl;

  getRoles() {
    return this.http.get(this.rootUrl + '/api/Roles');
  }

  getViews() {
    return this.http.get(this.rootUrl + '/api/Views');
  }

  putRole(id, role) {
    var body = JSON.stringify(role);
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json' });
    return this.http.put(this.rootUrl + '/api/Roles/' + id, body, { headers: reqHeader });
  }

  registerRole(role: Role) {
    const body: any = {
      Id: role.Id,
      Name: role.Name
    }
    return this.http.post(this.rootUrl + '/api/Roles', body);
  }

  registerRoleView(roleView: RoleView) {
    const body: any = {
      IdRole: roleView.IdRole,
      IdView: roleView.IdView
    }
    return this.http.post(this.rootUrl + '/api/RoleViews', body);
  }

  deleteRole(id: number){
    return this.http.delete(this.rootUrl + '/api/Roles/' + id);
  }

  deleteRoleView(idRoleView: number){
    return this.http.delete(this.rootUrl + '/api/RoleViews/' + idRoleView);
  }
}
