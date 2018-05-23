import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component';
import { HistoryComponent } from './history/history.component';
import { UserComponent } from './users/user.component';
import { ActivityComponent } from './activity/activity.component';
import { EnvironmentComponent } from './environment/environment.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [{
    path: '',
    //component: SettingComponent,
    children: [
        {
            path: 'history',
            loadChildren: './history/history.module#HistoryModule',
        },
        {
            path: 'users',
            component: UserComponent,
        },
        {
            path: 'activity',
            component: ActivityComponent,
        },
        {
            path: 'environment',
            component: EnvironmentComponent,
        },
        {
            path: 'roles',
            component: RolesComponent,
        },
        {
            path: '',
            redirectTo: 'history',
            pathMatch: 'full',
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingRoutingModule { }

export const routedComponents = [
    SettingComponent,
    UserComponent,
    ActivityComponent,
    EnvironmentComponent,
    RolesComponent
];

