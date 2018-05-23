import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  isLoginError: boolean = false;
  element = document.getElementById("divLogin");
  isLoginSend: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    this.isLoginSend = true;
    setTimeout(() => {
      this.userService.userAuthentication(userName, password).subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/home']);
      },
        (err: HttpErrorResponse) => {
          this.toastr.warning('Usuario o Contraseña Incorrectos', 'Error de Crendenciales');
          this.element.classList.add("shake1");
          setTimeout(() => {
            this.element.classList.remove("shake1");
          }, 800);
          this.isLoginError = true;
        });
        this.isLoginSend = false;
    }, 500);
  }

}
