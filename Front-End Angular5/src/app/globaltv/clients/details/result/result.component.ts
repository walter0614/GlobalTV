import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PlayerSesionBusinessService } from '../../../../shared/business/player-sesion-business.service';
import { PatientBusinessService } from '../../../../shared/business/patient-business.service';


@Component({
    selector: 'result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

    id: number;
    private sub: any;
    constructor(
        private route: ActivatedRoute,
        private playerSesionBS: PlayerSesionBusinessService,
        private playerHistoryBS: PatientBusinessService,
        private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.playerSesionBS.getPlayerSesion(this.id);
        this.playerHistoryBS.getPatientHistoryById(this.id);
    }

    convertStringToDate(dateString: string) {
        let newDate = new Date(dateString);
        return newDate;
    }

    prettyDate2(time) {
        let newDate = new Date(time);
        return 'Hora ' + newDate.getHours() +
            ':' + newDate.getMinutes() +
            ':' + newDate.getSeconds() +
            ' : ' + newDate.getMilliseconds();
    }
    redirectTo(data: any) {
        this.router.navigate(['/interactive/rivas/patient/activities/' + data.idPlayerSesion + '-' + data.idPlayerHistory]);
    }

}
