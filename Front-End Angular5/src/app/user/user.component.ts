import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../@core/data/state.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../@theme/layouts/main/main.layout.scss'],
})
export class UserComponent implements OnDestroy {

  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);


    const isBp = this.bpService.getByName('is');
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
  }

}
