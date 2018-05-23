import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import { PlayerHistory } from '../models/player-history.model';

@Injectable()
export class PatientBusinessService {

    patientList: Patient[];
    patientSearch: Patient[];
    imagesUser: any[] = ['alan.png', 'jack.png', 'nick.png', 'walter.png'];
    patientHistory: PlayerHistory;

    constructor(private patientService: PatientService) { }

    getPatients() {
        this.patientList = [];
        this.patientService.getPlayers().subscribe((data: any) => {
            data.forEach(element => {
                let patient: Patient = {
                    idPlayer: element.idPlayer,
                    idUser: element.idUser,
                    PlayerHistory: element.PlayerHistory,
                    User: element.User,
                    Image: this.randomImg()
                };
                this.patientList.push(patient);
            });
        });
        this.patientSearch = this.patientList;
    }

    getPatientHistoryById(id: number) {
        this.patientService.getPlayerHistoryById(id).subscribe((data: any) => {
            data.forEach(element => {
                this.patientHistory = {
                    idPlayerHistory: element.idPlayerHistory,
                    idPlayer: element.idPlayer,
                    idHistory: element.idHistory,
                    History: element.History,
                    Player: element.Player
                };
            });
        });
    }

    searchPatient(search: string) {
        if (search.length > 0)
            this.patientSearch = this.patientList.filter(item => item.User.FirstName.indexOf(search) >= 0 || item.User.LastName.indexOf(search) >= 0);
        else
            this.patientSearch = this.patientList;
    }
    randomImg() {
        let position = Math.floor(Math.random() * this.imagesUser.length);
        return 'assets/images/' + this.imagesUser[position];
    }

    addHistoryPatient(obj: any) {
        return this.patientService.registerHistoryPlayer(obj);
    }

    deleteHistoryPatient(id: number) {
        return this.patientService.deleteHistoryPlayer(id);
    }





}
