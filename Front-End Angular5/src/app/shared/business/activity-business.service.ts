import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { ActivityType } from '../models/activity-type.model';
import { CompetitionActivity } from '../models/competition-activity.model';

@Injectable()
export class ActivityBusinessService {

    activityList: Activity[];
    activitySearch: Activity[];
    activityTypes: ActivityType[];
    activitiesCompetitionAll: CompetitionActivity[];
    activitiesCompetition: CompetitionActivity[];
    activitiesObjects: any[];

    constructor(private activityService: ActivityService) { }

    getActivities() {
        this.activityList = [];
        this.activityService.getActivities().subscribe((data: any) => {
            data.forEach(element => {
                let activity: Activity = {
                    idActivity: element.idActivity,
                    name: element.name,
                    description: element.description,
                    idActivityType: element.idActivityType,
                };
                this.activityList.push(activity);
            });
        });
        this.activitySearch = this.activityList;
        console.log(this.activitySearch);
    }

    getActivitiesWithObject() {
        this.activitiesObjects = [];
        this.activityService.getActivities().subscribe((data: any) => {
            data.forEach(element => {
                let activity: any = {
                    idActivity: element.idActivity,
                    name: element.name,
                    description: element.description,
                    idActivityType: element.idActivityType,
                    ActivityObject: element.ActivityObject
                };
                this.activitiesObjects.push(activity);
            });
        });
        console.log(this.activitiesObjects);
    }

    getActivityTypes() {
        this.activityTypes = [];
        this.activityService.getActivityTypes().subscribe((data: any) => {
            data.forEach(element => {
                let activityType: ActivityType = {
                    idActivityType: element.idActivityType,
                    name: element.name
                };
                this.activityTypes.push(activityType);
            });
        });
    }

    getAllActivityCompetition() {
        this.activitiesCompetitionAll = [];
        this.activityService.getActivityCompetition().subscribe((data: any) => {
            data.forEach(element => {
                let activityCompetition: CompetitionActivity = {
                    idCompetitionActivity: element.idCompetitionActivity,
                    idCompetition: element.idCompetition,
                    idActivity: element.idActivity,
                    Competition: element.Competition
                }
                this.activitiesCompetitionAll.push(activityCompetition);
            });
        });
    }

    getActivityCompetition(Activity) {
        this.activitiesCompetition = [];
        this.activitiesCompetitionAll.forEach(element => {
            if (Activity.idActivity == element.idActivity) {
                let activityCompetition: CompetitionActivity = {
                    idCompetitionActivity: element.idCompetitionActivity,
                    idCompetition: element.idCompetition,
                    idActivity: element.idActivity,
                    Competition: element.Competition
                };
                this.activitiesCompetition.push(activityCompetition);
            }
        });
    }

    searchActivity(search) {
        if (search.length > 0)
            this.activitySearch = this.activityList.filter(item => item.idActivity.toString().indexOf(search) >= 0 || item.name.indexOf(search) >= 0 || item.description.indexOf(search) >= 0);
        else
            this.activitySearch = this.activityList;
    }

    addActivity(activity: Activity) {
        return this.activityService.registerActivity(activity);
    }

    updateActivity(idActivity, activity: Activity) {
        return this.activityService.putActivity(idActivity, activity);
    }

    addActivityCompetition(activityCompetition: any) {
        return this.activityService.registerActivityCompetition(activityCompetition);
    }

    deleteCompetitionActivity(idCompetitionActivity) {
        return this.activityService.deleteActivityCompetition(idCompetitionActivity);
    }

    getNameActivityType(idActivityType) {
        var result = 'N/A';
        this.activityTypes.forEach(element => {
            if (element.idActivityType == idActivityType)
                result = element.name
        });
        return result;
    }

}
