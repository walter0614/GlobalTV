import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { History } from '../../../shared/models/history.model';
import { HistoryBusinessService } from '../../../shared/business/history-business.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { NbSearchService, NbSearchModule } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private historyBS: HistoryBusinessService, private modalService: NgbModal, private toasterService: ToasterService, private mytoaster: MytoasterService) { }
  search: string = '';
  historySelected: History;
  config = this.mytoaster.config;
  modalReference: any;

  ngOnInit() {
    this.historyBS.getHistories();
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (this.historySelected.idHistory > 0) {
      this.historyBS.updateHistory(this.historySelected.idHistory, this.historySelected)
        .subscribe(data => {
          this.modalReference.close();
          this.toasterService.pop('success', 'Historia Actualizada!', '');
          this.historyBS.getHistories();
          this.resetForm();
        });
    } else {
      this.historyBS.addHistory(this.historySelected)
        .subscribe((data: any) => {
          if (data.idHistory > 0) {
            this.modalReference.close();
            this.toasterService.pop('success', 'Historia Registrada!', '');
            this.historyBS.getHistories();
            this.resetForm();
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    }
  }

  open(content, history?: History) {
    this.modalReference = this.modalService.open(content);
    this.historySelected = history ? history : this.historySelected;
  }

  //Search
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter" && (<Element>event.target).className == "search-input") {
      this.historyBS.searchHistories(this.search = localStorage.getItem('search-input'));
      localStorage.setItem('search-input', '');
    }
  }

  resetSearch() {
    this.historyBS.searchHistories(this.search = '');
  }

  resetForm() {
    this.historySelected = {
      Id: '',
      PlayerHistory: [],
      Sequence: [],
      idHistory: 0,
      Name: ''
    };
  }
}
