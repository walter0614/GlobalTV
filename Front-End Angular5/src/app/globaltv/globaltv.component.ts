import { Component } from '@angular/core';

import { MENU_ITEMS } from './globaltv-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `,
})
export class GlobalTVComponent {

  menu = MENU_ITEMS;
}
