import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';
import { CompetitionService } from '../services/competition.service';

@Injectable()
export class CompetitionBusinessService {

  competitionList: Competition[];
  competitionSearch: Competition[];

  constructor(private competitionService: CompetitionService) { }

  getCompetitions() {
    this.competitionList = [];
    this.competitionService.getCompetitions().subscribe((data: any) => {
      data.forEach(element => {
        let competition: Competition = {
          idCompetition: element.idCompetition,
          name: element.name
        };
        this.competitionList.push(competition);
      });
    });
    this.competitionSearch = this.competitionList;
  }

  searchCompetitions(search: string) {
    if (search.length > 0)
      this.competitionSearch = this.competitionList.filter(item => item.idCompetition.toString().indexOf(search) >= 0 || item.name.indexOf(search) >= 0);
    else
      this.competitionSearch = this.competitionList;
  }

  addCompetition(competition: Competition) {
    return this.competitionService.registerCompetition(competition);
  }

  updateCompetition(idCompetition, competition: Competition) {
    return this.competitionService.putCompetition(idCompetition, competition);
  }

}
