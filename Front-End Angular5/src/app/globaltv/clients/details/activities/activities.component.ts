import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerSesionBusinessService } from '../../../../shared/business/player-sesion-business.service';
import { PatientBusinessService } from '../../../../shared/business/patient-business.service';
import { ActivityBusinessService } from '../../../../shared/business/activity-business.service';


@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {

    //@Input() activities: any[];
    idPlayerSesion: number;
    idPlayerHistory: number;
    myInput: string;
    private sub: any;
    constructor(private route: ActivatedRoute,
        private playerSesionBS: PlayerSesionBusinessService,
        private playerHistoryBS: PatientBusinessService,
        private activityBS: ActivityBusinessService,
        private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.myInput = params['id'];
            let split = (params['id']).toString().split("-");
            this.idPlayerSesion = split[0];
            this.idPlayerHistory = split[1];
        });
        this.activityBS.getActivitiesWithObject();
        //this.playerSesionBS.getPlayerSesion(this.id);
        this.playerHistoryBS.getPatientHistoryById(this.idPlayerHistory);
    }

}
