import { Injectable } from '@angular/core';
import { History } from '../models/history.model';
import { HistoryService } from '../services/history.service';

@Injectable()
export class HistoryBusinessService {

  history: History;
  historyList: History[];
  historySearch: History[];

  constructor(private historyService: HistoryService) { }

  getHistories() {
    this.historyList = [];
    this.historyService.getHistories().subscribe((data: any) => {
      data.forEach(element => {
        let history: History = {
          Id: element.$id,
          PlayerHistory: element.PlayerHistory,
          Sequence: element.Sequence,
          idHistory: element.idHistory,
          Name: element.name
        };
        this.historyList.push(history);
      });
    });
    this.historySearch = this.historyList;
  }

  getHistoryById(id: number){
    this.history = new History;
    this.historyService.getHistoryById(id).subscribe((data: any) => {
      this.history = data[0];
    });
  }

  searchHistories(search: string) {
    if (search.length > 0)
      this.historySearch = this.historyList.filter(item => item.idHistory.toString().indexOf(search) >= 0 || item.Name.indexOf(search) >= 0);
    else
      this.historySearch = this.historyList;
  }

  addHistory(history: History) {
    return this.historyService.registerHistory(history);
  }

  updateHistory(idHistory, history: History) {
    return this.historyService.putHistory(idHistory, history);
  }

}
