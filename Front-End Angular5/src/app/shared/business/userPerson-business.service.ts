import { Injectable } from '@angular/core';
import { CompetitionActivity } from '../models/competition-activity.model';
import { Observable, Observer } from 'rxjs/Rx';
import { LocalDataSource } from 'ng2-smart-table';
import { id } from '@swimlane/ngx-charts/release/utils';
import { UserPerson } from '../models/user-person.model';
import { UserPersonService } from '../services/userPerson.service';

@Injectable()
export class UserPersonBusinessService {

    public userPList: UserPerson[];

    constructor(private userPService: UserPersonService) {
    }


    getUserPerson() {
        this.userPList = [];
        this.userPService.getUserPerson().subscribe((data: any) => {
            data.forEach(element => {
                let userP: UserPerson = {
                    UserName: element.UserName,
                    Id: element.Id,
                    Email: element.Email,
                    FirstName: element.FirstName,
                    LastName: element.LastName,
                    PasswordHash: element.PasswordHash
                };
                this.userPList.push(userP);
            });
        });
    }


    getUserPersonMain() {
        return this.userPService.getUserPerson();
    }

    addUserPerson(userP: UserPerson) {
        return this.userPService.registerUserPerson(userP);
    }


    updateUserPerson(idUserPerson, userP: UserPerson) {
        return this.userPService.putUserPerson(idUserPerson, userP);
    }

    deleteUserPerson(idUserPerson: number) {
        return this.userPService.deleteUserPerson(idUserPerson);
    }

}
