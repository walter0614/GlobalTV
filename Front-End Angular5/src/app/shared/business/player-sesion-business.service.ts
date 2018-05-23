import { Injectable } from '@angular/core';
import { PlayerSesion } from '../models/player-sesion.model';
import { PlayerSesionService } from '../services/player-sesion.service.';

@Injectable()
export class PlayerSesionBusinessService {

    playerSesiontList: PlayerSesion[];
    playerSesiontSearch: PlayerSesion[];

    constructor(private playerSesionService: PlayerSesionService) { }

    getPlayerSesion(id: number) {
        this.playerSesiontList = [];
        this.playerSesionService.getPlayerSesionById(id).subscribe((data: any) => {
            data.forEach(element => {
                let playerSesion: PlayerSesion = {
                    idPlayerSesion: element.idPlayerSesion,
                    startDate: element.startDate,
                    idPlayerHistory: element.idPlayerHistory,
                    siteOrigin: element.siteOrigin,
                    systemOrigin: element.systemOrigin,
                    locationOrigin: element.locationOrigin,
                    Interaction: element.Interaction,
                    PlayerSesion: element.PlayerSesion
                };
                this.playerSesiontList.push(playerSesion);
            });
        });
        this.playerSesiontSearch = this.playerSesiontList;
    }

    searchPlayerSesion(search: string) {
        if (search.length > 0)
            this.playerSesiontSearch = this.playerSesiontList.filter(item => item.startDate.indexOf(search) >= 0);
        else
            this.playerSesiontSearch = this.playerSesiontList;
    }




}
