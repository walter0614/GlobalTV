import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Object } from '../../../shared/models/object.model';
import { ObjectBusinessService } from '../../../shared/business/object-business.service';
import { ActivityBusinessService } from '../../../shared/business/activity-business.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { SmartTable } from '../../../shared/services/smartTable.service';
import { RoleBusinessService } from '../../../shared/business/role-business.service';
import { Role } from '../../../shared/models/role.model';
import { RoleService } from '../../../shared/services/roles.service';
import { RoleView } from '../../../shared/models/role-view.model';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  modalReference: any;
  actionOnTable: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private mytoaster: MytoasterService,
    private service: SmartTableService,
    private smartTable: SmartTable,
    private roleServiceBS: RoleBusinessService
  ) { }

  ngOnInit() {
    this.settings = this.smartTable.settings;
    this.settings.columns = {
      Name: {
        title: 'Name',
        type: 'string',
      },
    }
    this.getRoles();
    this.roleServiceBS.getViews();
  }

  onDeleteConfirm(event, content): void {
    this.modalReference = this.modalService.open(content);
    this.actionOnTable = { action: "D", event: event };
  }

  onCreateConfirm(event, content) {
    this.modalReference = this.modalService.open(content);
    this.actionOnTable = { action: "C", event: event };
  }

  onSaveConfirm(event, content) {
    this.modalReference = this.modalService.open(content);
    this.actionOnTable = { action: "S", event: event };
  }

  rejectedAction() {
    this.actionOnTable.event.confirm.reject();
  }

  resolveAction() {
    if (this.actionOnTable.action && this.actionOnTable.event) {
      switch (this.actionOnTable.action) {
        case "D": {
          if (this.actionOnTable.event.data.RoleView.length == 0) {
            this.roleServiceBS.deleteRole(this.actionOnTable.event.data.Id).subscribe((data: any) => {
              if (data.Id) {
                this.toasterService.pop('success', 'Rol eliminado exitosamente!', '');
                this.actionOnTable.event.confirm.resolve();
                this.getRoles();
              } else {
                this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
                this.rejectedAction();
              }
            });
          } else {
            this.toasterService.pop('error', 'Elimine todos los permisos para continuar!', '');
            this.rejectedAction();
          }
          break;
        }
        case "C": {
          let role: Role = {
            Name: this.actionOnTable.event.newData.Name,
            Id: 'NA'
          }
          this.roleServiceBS.addRole(role).subscribe((data: any) => {
            if (data.Id) {
              this.toasterService.pop('success', 'Rol creado exitosamente!', '');
              this.actionOnTable.event.confirm.resolve();
              this.getRoles();
            } else {
              this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
              this.rejectedAction();
            }
          });
          break;
        }
        case "S": {
          let role: Role = {
            Name: this.actionOnTable.event.newData.Name,
            Id: this.actionOnTable.event.data.Id
          }
          this.roleServiceBS.updateRole(role.Id, role).subscribe((data: any) => {
            this.toasterService.pop('success', 'Rol actualizado exitosamente!', '');
            this.actionOnTable.event.confirm.resolve();
          });
          break;
        }
      }
    } else {
      this.toasterService.pop('error', 'No se guardaron los datos!', 'Ocurrio un error durante la transacción');
    }
    this.modalReference.close();
  }

  getRoles() {
    let roleList: any[] = [];
    this.roleServiceBS.getRolesMain().subscribe((data: any) => {
      data.forEach(element => {
        roleList.push({ Name: element.Name, Id: element.Id, RoleView: element.RoleView });
      });
      this.source.load(roleList);
    });
  }

  validateView(idView: number) {
    let result: boolean = false;
    if (this.actionOnTable.action != 'C') {
      this.actionOnTable.event.data.RoleView.forEach(element => {
        result = (element.IdView == idView) ? true : (result) ? true : false;
      });
    }
    return result;
  }

  saveView(idView: number, e) {
    if (e.target.checked) {
      let roleView: RoleView = {
        IdRole: this.actionOnTable.event.data.Id,
        IdView: idView
      }
      this.roleServiceBS.addRoleView(roleView).subscribe((data: any) => {
        if (data.IdRoleView) {
          this.toasterService.pop('success', 'Permiso creado exitosamente!', '');
          this.getRoles();
        } else {
          this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
        }
      });
    } else {
      let IdRoleView: number = 0;
      this.actionOnTable.event.data.RoleView.forEach(element => {
        IdRoleView = (element.IdView == idView) ? element.IdRoleView : (IdRoleView > 0) ? IdRoleView : 0;
      });
      if (IdRoleView > 0) {
        this.roleServiceBS.deleteRoleView(IdRoleView).subscribe((data: any) => {
          if (data.IdRoleView) {
            this.toasterService.pop('success', 'Permiso eliminado exitosamente!', '');
            this.getRoles();
          } else {
            this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
          }
        });
      } else {
        this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', 'Cierre la ventana emergente e intente de nuevo.');
      }
    }
    this.rejectedAction();
  }

}

