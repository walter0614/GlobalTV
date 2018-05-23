import { Injectable } from '@angular/core';
import { Object } from '../models/object.model';
import { ObjectService } from '../services/object.service';

@Injectable()
export class ObjectBusinessService {

    objectList: Object[];
    objectSearch: Object[];

    constructor(private objectService: ObjectService) { }

    getObjects() {
        this.objectList = [];
        this.objectService.getObjects().subscribe((data: any) => {
            data.forEach(element => {
                let obj: Object = {
                    idObject: element.idObject,
                    name: element.name,
                    ActivityObject: element.ActivityObject
                };
                this.objectList.push(obj);
            });
        });
        this.objectSearch = this.objectList;
    }

    searchObject(search: string) {
        if (search.length > 0)
            this.objectSearch = this.objectList.filter(item => item.idObject.toString().indexOf(search) >= 0 || item.name.indexOf(search) >= 0);
        else
            this.objectSearch = this.objectList;
    }

    registerObject(object: Object) {
        return this.objectService.registerObject(object);
    }

    updateObject(idObject: number, object: Object) {
        return this.objectService.putObject(idObject, object);
    }

    deleteObjectActivity(idObjectActivity: number) {
        return this.objectService.deleteActivityObject(idObjectActivity);
    }

    registerObjectActivity(objectActivity: any) {
        return this.objectService.registerObjectActivity(objectActivity);
    }



}
