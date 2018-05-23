import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { SmartTable } from '../../../shared/services/smartTable.service';
import { UserPersonBusinessService } from '../../../shared/business/userPerson-business.service';
import { UserPerson } from '../../../shared/models/user-person.model';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';


@Component({
  selector: 'ngx-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

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
    private userPServiceBS: UserPersonBusinessService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.settings = this.smartTable.settings;
    this.settings.columns = {
      UserName: {
        title: 'Usuario',
        type: 'string',
      },
      PasswordHash: {
        title: 'Contraseña',
        type: 'string',
      },
      Email: {
        title: 'Correo',
        type: 'string',
      },
      FirstName: {
        title: 'Nombres',
        type: 'string',
      },
      LastName: {
        title: 'Apellidos',
        type: 'string',
      }
    }
    this.getUserPerson();
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
          this.userPServiceBS.deleteUserPerson(this.actionOnTable.event.data.Id).subscribe((data: any) => {
            if (data.Id) {
              this.toasterService.pop('success', 'Usuario eliminado exitosamente!', '');
              this.actionOnTable.event.confirm.resolve();
              this.getUserPerson();
            } else {
              this.toasterService.pop('error', 'Los Cambios No Se Realizaron!', '');
              this.rejectedAction();
            }
          });
          break;
        }
        case "C": {
          let userP: User = {
            UserName: this.actionOnTable.event.newData.UserName,
            Email: this.actionOnTable.event.newData.Email,
            FirstName: this.actionOnTable.event.newData.FirstName,
            LastName: this.actionOnTable.event.newData.LastName,
            Password: this.actionOnTable.event.newData.PasswordHash
          }
          this.userService.registerUser(userP)
          .subscribe((data: any) => {
            if (data.Succeeded == true) {
              this.toasterService.pop('success', 'Usuario Creado Correctamente!', 'El Usuario debe ser habilitado.');
              this.actionOnTable.event.confirm.resolve();
              this.getUserPerson();
            } else {
              this.toasterService.pop('error', data.Errors[0], '');
              this.rejectedAction();
            }
          });
          break;
        }
        case "S": {
          let userP: UserPerson = {
            UserName: this.actionOnTable.event.newData.UserName,
            Id: this.actionOnTable.event.newData.Id,
            Email: this.actionOnTable.event.newData.Email,
            FirstName: this.actionOnTable.event.newData.FirstName,
            LastName: this.actionOnTable.event.newData.LastName,
            PasswordHash: this.actionOnTable.event.newData.PasswordHash
          }
          this.userPServiceBS.updateUserPerson(userP.Id, userP).subscribe((data: any) => {
            this.toasterService.pop('success', 'Usuario actualizado exitosamente!', '');
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

  getUserPerson() {
    let userPList: any[] = [];
    this.userPServiceBS.getUserPersonMain().subscribe((data: any) => {
      data.forEach(element => {
        userPList.push({
          UserName: element.UserName,
          Id: element.Id,
          Email: element.Email,
          FirstName: element.FirstName,
          LastName: element.LastName,
          // PasswordHash: element.PasswordHash
          PasswordHash: 'Encrypted'
        });
      });
      this.source.load(userPList);
    });
  }




}
