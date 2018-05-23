import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { DetailsComponent } from './details/details.component';
// import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [{
    path: '',
    //component: RivasComponent,
    children: [
        {
            path: 'details',
            loadChildren: './details/details.module#DetailsModule',
        },
        {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full',
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientsRoutingModule { }

export const routedComponents = [
    ClientsComponent
];
