import { HostListener, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { PatientBusinessService } from '../../../shared/business/patient-business.service';
import { Patient } from '../../../shared/models/patient.model';
import { User } from '../../../shared/models/user.model';
import { HistoryBusinessService } from '../../../shared/business/history-business.service';
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-patient',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent{

  constructor(
    private historyBS: HistoryBusinessService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private patientBS: PatientBusinessService,
    private toasterService: ToasterService,
    private mytoaster: MytoasterService,
  ) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  search: string = '';
  currentPatient: Patient;
  config = this.mytoaster.config;


  ngOnInit() {
    this.historyBS.getHistories();
    this.patientBS.getPatients();
    this.resetForm();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  //Search
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter" && (<Element>event.target).className == "search-input") {
      this.patientBS.searchPatient(this.search = localStorage.getItem('search-input'));
      localStorage.setItem('search-input', '');
    }
  }

  resetSearch() {
    this.patientBS.searchPatient(this.search = '');
  }

  showForEdit(patient: Patient) {
    this.currentPatient = patient;
  }

  resetForm() {
    this.currentPatient = {
      idPlayer: 0,
      idUser: '',
      PlayerHistory: [],
      User: new User,
      Image: ''
    }
  }

  onSubmitHistory(form: NgForm) {
    let historyPatient: any = form.value;
    if (historyPatient.idHistory) {
      this.patientBS.addHistoryPatient({
        idHistory: historyPatient.idHistory,
        idPlayer: this.currentPatient.idPlayer
      })
        .subscribe((data: any) => {
          if (data.idPlayer > 0) {
            this.patientBS.getPatients();
            this.toasterService.pop('success', 'Historia Asignada!', '');
            this.resetForm();
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    } else {
      this.toasterService.pop('error', 'Seleccione una Historia!');
    }
  }

  deleteHistoryPatient(id:number){
    this.patientBS.deleteHistoryPatient(id)
      .subscribe((data: any) => {
        if (data.idPlayerHistory > 0) {
          this.patientBS.getPatients();
          this.toasterService.pop('success', 'Paciente actualizado satisfactoriamente!');
          this.resetForm();
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
  }


}
