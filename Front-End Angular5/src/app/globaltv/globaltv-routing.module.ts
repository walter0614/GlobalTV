import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GlobalTVComponent } from './globaltv.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: GlobalTVComponent,
  children: [
    {
      path: 'clients',
      loadChildren: './clients/clients.module#ClientsModule',
    },
    {
      path: 'setting',
      loadChildren: './settings/setting.module#SettingModule',
    },
    {
      path: 'dashboard',
      loadChildren: './charts/charts.module#ChartsModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalTVRoutingModule {
}
