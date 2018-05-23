import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { RoleService } from '../services/roles.service';
import { CompetitionActivity } from '../models/competition-activity.model';
import { Observable, Observer } from 'rxjs/Rx';
import { LocalDataSource } from 'ng2-smart-table';
import { id } from '@swimlane/ngx-charts/release/utils';
import { View } from '../models/view.model';
import { RoleView } from '../models/role-view.model';

@Injectable()
export class RoleBusinessService {

    public roleList: Role[];
    public viewList: View[];

    constructor(private roleService: RoleService) {
    }


    getRoles() {
        this.roleList = [];
        this.roleService.getRoles().subscribe((data: any) => {
            data.forEach(element => {
                let role: Role = {
                    Id: element.Id,
                    Name: element.Name
                };
                this.roleList.push(role);
            });
        });
    }

    getViews() {
        this.viewList = [];
        this.roleService.getViews().subscribe((data: any) => {
            data.forEach(element => {
                let view: View = {
                    IdView: element.IdView,
                    NameView: element.NameView
                };
                this.viewList.push(view);
            });
        });
    }

    getRolesMain() {
        return this.roleService.getRoles();
    }

    addRole(role: Role) {
        return this.roleService.registerRole(role);
    }

    addRoleView(roleView: RoleView){
        return this.roleService.registerRoleView(roleView);
    }

    updateRole(idRole, role: Role) {
        return this.roleService.putRole(idRole, role);
    }

    deleteRole(idRole) {
        return this.roleService.deleteRole(idRole);
    }

    deleteRoleView(idRoleView) {
        return this.roleService.deleteRoleView(idRoleView);
    }



}
