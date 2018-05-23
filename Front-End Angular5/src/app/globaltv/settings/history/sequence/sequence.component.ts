import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sequence } from '../../../../shared/models/sequence.model';
import { Rule } from '../../../../shared/models/rule.model';
import { NgForm } from '@angular/forms';
import { Activity } from '../../../../shared/models/activity.model';
import { ActivityBusinessService } from '../../../../shared/business/activity-business.service';
import { SequenceBusinessService } from '../../../../shared/business/sequence-business.service';
import { MytoasterService } from '../../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';
import { HistoryBusinessService } from '../../../../shared/business/history-business.service';

@Component({
  selector: 'sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent implements OnInit {

  id: number;
  activities: Activity[] = [];
  private sub: any;
  transactionSelected: any;
  sequence: Sequence[] = [];
  rules: Rule[] = [];
  config = this.mytoaster.config;

  //positionClass: 'toast-bottom-full-width',

  constructor(
    private route: ActivatedRoute,
    private activityBS: ActivityBusinessService,
    private sequenceBS: SequenceBusinessService,
    private toasterService: ToasterService,
    private mytoaster: MytoasterService,
    private historyBS: HistoryBusinessService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.activityBS.getActivities();
    this.sequenceBS.getSequenceByHistory(this.id);
    this.config.positionClass = "toast-top-right";
    this.historyBS.getHistoryById(this.id);
    this.resetForm();
  }
  addSequence(e: any) {
    if(this.transactionSelected.idSequence>0){
      this.addActivityToSequence(e);
    }else{
      this.sequenceBS.registerSequence({
        idHistory: this.id,
        idActivity: e.dragData.idActivity,
        orderSequence: 1
      })
        .subscribe((data: any) => {
          if (data.idSequence > 0) {
            this.sequenceBS.getSequenceByHistory(this.id);
            this.toasterService.pop('success', 'Secuencia Registrada!', 'Registro almacenado satisfactoriamente');
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    }
  }
  deleteSequence(e: any) {
    if (e.dragData.idSequence==undefined) {
      this.toasterService.pop('warning', 'Agregue las actividades en la secuencia!', '');
    } else if(e.dragData.Rules.length > 0){
      this.toasterService.pop('warning', 'Elimine las reglas de esta secuencia!', '');
    }else {
      this.sequenceBS.deleteSequence(e.dragData.idSequence)
        .subscribe((data: any) => {
          if (data.idSequence > 0) {
            this.sequenceBS.getSequenceByHistory(this.id);
            this.toasterService.pop('success', 'Secuencia Actualizada!', 'Registro almacenado satisfactoriamente');
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
    }
  }
  addActivityToSequence(e: any) {
    if (e.dragData.idSequence > 0) {
      this.toasterService.pop('warning', 'Agregue una actividad, no una secuencia!', '');
    } else {
      this.toasterService.pop('success', 'Guarde para realizar los cambios!', '');
      this.transactionSelected.Activity = e.dragData;
    }
  }

  SetRules(rule: Rule) {
    this.toasterService.pop('success', 'Revisando Regla!', '');
    this.transactionSelected = rule;
  }
  onSubmit(form: NgForm) {
    if (this.transactionSelected.idRules > 0) {
      let obj = {
        idRules: this.transactionSelected.idRules,
        idSequence: this.transactionSelected.idSequence,
        minQualitative: this.transactionSelected.minQualitative,
        maxQualitative: this.transactionSelected.maxQualitative,
        minQuantitative: this.transactionSelected.minQuantitative,
        maxQuantitative: this.transactionSelected.maxQuantitative,
        idRulesType: 1,
        idDifficulty: 2,
        idActivity: this.transactionSelected.Activity.idActivity
      }
      this.sequenceBS.putRule(this.transactionSelected.idRules, obj)
        .subscribe((data: any) => {
          this.sequenceBS.getSequenceByHistory(this.id);
          this.resetForm();
          this.toasterService.pop('success', 'Regla Actualizada!', '');
        });
    } else {
      let obj = {
        idSequence: this.transactionSelected.idSequence,
        minQualitative: this.transactionSelected.minQualitative,
        maxQualitative: this.transactionSelected.maxQualitative,
        minQuantitative: this.transactionSelected.minQuantitative,
        maxQuantitative: this.transactionSelected.maxQuantitative,
        idRulesType: 1,
        idDifficulty: 2,
        idActivity: this.transactionSelected.Activity.idActivity
      }
      if (obj.idActivity == undefined) {
        this.toasterService.pop('warning', 'Arrastre la Actividad Siguiente!', '');
      } else {
        this.sequenceBS.registerRule(obj)
          .subscribe((data: any) => {
            if (data.idRules > 0) {
              this.sequenceBS.getSequenceByHistory(this.id);
              this.resetForm();
              this.toasterService.pop('success', 'Regla Almacenada Correctamente!', '');
            } else {
              this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
            }
          });
      }
    }
  }
  resetForm() {
    this.transactionSelected = {
      idRules: 0,
      idSequence: 0,
      minQualitative: 0,
      maxQualitative: 0,
      minQuantitative: 0,
      maxQuantitative: 0,
      RulesType: [],
      Difficulty: [],
      Activity: []
    };
  }

  AddRule(item: Sequence) {
    this.resetForm();
    this.transactionSelected.idSequence = item.idSequence;
  }

  deleteRule(rule: Rule) {
    this.sequenceBS.deleteRule(rule.idRules)
      .subscribe((data: any) => {
        if (data.idRules > 0) {
          this.resetForm();
          this.sequenceBS.getSequenceByHistory(this.id);
          this.toasterService.pop('success', 'Regla Eliminada Correctamente!', '');
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
  }

}
