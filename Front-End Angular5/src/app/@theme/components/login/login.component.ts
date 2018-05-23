import { NgModule, Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { User } from '../../../shared/models/user.model';
import { UserMain } from '../../../shared/models/user-main.model';
import 'style-loader!angular2-toaster/toaster.css';
import { MytoasterService } from '../../../shared/services/mytoaster.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toasterService: ToasterService, 
    private mytoaster: MytoasterService
  ) { }
  config = this.mytoaster.config;
  user: User;

  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.location.reload();
    }
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(userName, password) {

    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
      let userMain: UserMain = {
        Email: data.Email,
        FirstName: data.FirstName,
        IdUser: data.IdUser,
        LastName: data.LastName,
        LoggedOn: data.LoggedOn,
        UserName: data.UserName
      }
      localStorage.setItem('user', JSON.stringify(userMain));
      localStorage.setItem('userToken', data.access_token);
      this.toasterService.pop('success', 'Bienvenido ' + userName + '!', 'Sistema de Gestión de Inventarios de Gloval TV.');
      setTimeout(() => {
        this.router.navigate(['/globaltv']);
      }, 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.pop('error', 'Datos Incorrectos!', 'Por Favor Verifique Sus Credenciales.');
      });

  }

  OnSubmitUser(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toasterService.pop('success', 'Usuario Creado Correctamente!', 'El Usuario debe ser habilitado.');
        } else {
          this.toasterService.pop('error', data.Errors[0], '');
        }
      });
  }

}






