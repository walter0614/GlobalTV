import { NgModule } from '@angular/core';

import { GlobalTVComponent } from './globaltv.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GlobalTVRoutingModule } from './globaltv-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const INTERACTIVE_COMPONENTS = [
  GlobalTVComponent,
];

@NgModule({
  imports: [
    GlobalTVRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...INTERACTIVE_COMPONENTS,
  ],
})
export class GlobalTVModule {
}
