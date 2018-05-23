import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from '../../../shared/models/environment.model';
import { EnvironmentBusinessService } from '../../../shared/business/environment-business.service';
import { ActivityBusinessService } from '../../../shared/business/activity-business.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss'],
})
export class EnvironmentComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private mytoaster: MytoasterService,
    private environmentBS: EnvironmentBusinessService,
    private activityBS: ActivityBusinessService
  ) { }

  search: string = '';
  environmentSelected: Environment;
  config = this.mytoaster.config;
  modalReference: any;
  options: NgbModalOptions = {
    backdrop: 'static'
  };

  ngOnInit() {
    this.environmentBS.getEnvironments();
    this.activityBS.getActivities();
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (this.environmentSelected.idEnvironment > 0) {
      this.environmentBS.updateEnvironment(this.environmentSelected.idEnvironment, this.environmentSelected)
        .subscribe(data => {
          this.modalReference.close();
          this.toasterService.pop('success', 'Entorno Actualizado!', '');
          this.environmentBS.getEnvironments();
          this.resetForm();
        })
    } else {
      this.environmentBS.registerEnvironment(this.environmentSelected)
        .subscribe((data: any) => {
          if (data.idEnvironment > 0) {
            this.modalReference.close();
            this.toasterService.pop('success', 'Entorno Registrado!', '');
            this.environmentBS.getEnvironments();
            this.resetForm();
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    }
  }

  open(content, environment?: Environment) {
    this.resetForm();
    this.modalReference = this.modalService.open(content);
    this.environmentSelected = environment ? environment : this.environmentSelected;
  }


  //Search
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Enter" && (<Element>event.target).className == "search-input") {
      this.environmentBS.searchEnvironment(this.search = localStorage.getItem('search-input'));
      localStorage.setItem('search-input', '');
    }
  }

  resetSearch() {
    this.environmentBS.searchEnvironment(this.search = '');
  }

  resetForm() {
    this.environmentSelected = {
      idEnvironment: 0,
      name: '',
      ActivityEnvironment: []
    };
  }

  onSubmitAE(form: NgForm) {
    this.environmentBS.registerActivityEnvironment(form.value)
      .subscribe((data: any) => {
        if (data.idActivityEnvironment > 0) {
          this.toasterService.pop('success', 'Entorno Actualizado!', 'Registro almacenado satisfactoriamente');
          this.environmentBS.getEnvironments();
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
  }

  deleteActivityEnvironment(idActivityEnvironment: number) {
    this.environmentBS.deleteActivityEnvironment(idActivityEnvironment)
      .subscribe((data: any) => {
        if (data.idActivityEnvironment > 0) {
          this.modalReference.close();
          this.toasterService.pop('success', 'Entorno Actualizado!', 'Registro almacenado satisfactoriamente');
          this.environmentBS.getEnvironments();
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
  }

}

