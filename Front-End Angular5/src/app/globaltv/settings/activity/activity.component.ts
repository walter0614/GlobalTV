import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../../../shared/models/activity.model';
import { ActivityBusinessService } from '../../../shared/business/activity-business.service';
import { CompetitionBusinessService } from '../../../shared/business/competition-business.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private mytoaster: MytoasterService,
    private activityBS: ActivityBusinessService,
    private competitionBS: CompetitionBusinessService
  ) { }

  search: string = '';
  activitySelected: Activity;
  config = this.mytoaster.config;
  modalReference: any;
  options: NgbModalOptions = {
    backdrop: 'static'
  };

  ngOnInit() {
    this.activityBS.getActivities();
    this.activityBS.getActivityTypes();
    this.activityBS.getAllActivityCompetition();
    this.competitionBS.getCompetitions();
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (this.activitySelected.idActivity > 0) {
      this.activityBS.updateActivity(this.activitySelected.idActivity, this.activitySelected)
        .subscribe(data => {
          this.modalReference.close();
          this.toasterService.pop('success', 'Actividad Actualizada!', '');
          this.activityBS.getActivities();
          this.resetForm();
        })
    } else {
      this.activityBS.addActivity(this.activitySelected)
        .subscribe((data: any) => {
          if (data.idActivity > 0) {
            this.modalReference.close();
            this.toasterService.pop('success', 'Actividad Registrada!', '');
            this.activityBS.getActivities();
            this.resetForm();
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    }
  }

  open(content, activity?: Activity) {
    this.resetForm();
    this.modalReference = this.modalService.open(content);
    this.activitySelected = activity ? activity : this.activitySelected;
  }

  open2(content, activity?: Activity) {
    this.modalReference = this.modalService.open(content, this.options);
    this.activitySelected = activity ? activity : this.activitySelected;
    this.activityBS.getActivityCompetition(this.activitySelected);
  }

  //Search
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter" && (<Element>event.target).className == "search-input") {
      this.activityBS.searchActivity(this.search = localStorage.getItem('search-input'));
      localStorage.setItem('search-input', '');
    }
  }

  resetSearch() {
    this.activityBS.searchActivity(this.search = '');
  }

  resetForm() {
    this.activitySelected = {
      idActivity: 0,
      name: '',
      description: '',
      idActivityType: 0,
    };
  }

  onSubmitCompetition(form: NgForm) {
    this.activityBS.addActivityCompetition({
      idCompetition: form.value.idCompetition,
      idActivity: this.activitySelected.idActivity
    })
      .subscribe((data: any) => {
        if (data.idActivity > 0) {
          this.activityBS.getAllActivityCompetition();
          this.toasterService.pop('success', 'Competencias Actualizadas!', '');
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
      this.refresh(this.activitySelected);
  }

  deleteCompetitionActivity(idCompetitionActivity) {
    this.activityBS.deleteCompetitionActivity(idCompetitionActivity)
      .subscribe((data: any) => {
        if (data.idCompetitionActivity > 0) {
          this.activityBS.getAllActivityCompetition();
          this.modalReference.close();
          this.toasterService.pop('success', 'Registro eliminado satisfactoriamente!', 'Competencia Desasociada');
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
      this.refresh(this.activitySelected);
  }

  refresh(activity: Activity) {
    this.activityBS.getActivityCompetition(activity);
  }
}

