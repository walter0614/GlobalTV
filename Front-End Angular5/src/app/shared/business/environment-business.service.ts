import { Injectable } from '@angular/core';
import { Environment } from '../models/environment.model';
import { EnvironmentService } from '../services/environment.service';

@Injectable()
export class EnvironmentBusinessService {

    environmentList: Environment[];
    environmentSearch: Environment[];

    constructor(private environmentService: EnvironmentService) { }

    getEnvironments() {
        this.environmentList = [];
        this.environmentService.getEnvironments().subscribe((data: any) => {
            data.forEach(element => {
                let environment: Environment = {
                    idEnvironment: element.idEnvironment,
                    name: element.name,
                    ActivityEnvironment: element.ActivityEnvironment
                };
                this.environmentList.push(environment);
            });
        });
        this.environmentSearch = this.environmentList;
    }

    searchEnvironment(search: string) {
        if (search.length > 0)
            this.environmentSearch = this.environmentList.filter(item => item.idEnvironment.toString().indexOf(search) >= 0 || item.name.indexOf(search) >= 0);
        else
            this.environmentSearch = this.environmentList;
    }

    registerEnvironment(environment: Environment) {
        return this.environmentService.registerEnvironment(environment);
    }

    updateEnvironment(idEnvironment: number, environment: Environment) {
        return this.environmentService.putEnvironment(idEnvironment, environment);
    }

    deleteActivityEnvironment(idActivityEnvironment:number){
        return this.environmentService.deleteEnvironment(idActivityEnvironment);
    }

    registerActivityEnvironment(activityEnvironment: any){
        return this.environmentService.registerActivityEnvironment(activityEnvironment);
    }



}
