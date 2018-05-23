import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { SystemVariablesService } from '../../../shared/services/system-variables.service';
import { UserMain } from '../../../shared/models/user-main.model';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private system: SystemVariablesService) {
  }

  @Input() position = 'normal';

  user: any;
  myUser: UserMain = JSON.parse( localStorage.getItem('user'));

  userMenu = [{ title: 'Perfil', link: '/pages/dashboard', }, { title: 'Salir', link: '/auth' }];



  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.walter);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
