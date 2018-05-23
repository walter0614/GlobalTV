import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { ResultComponent } from './result/result.component';
import { ActivitiesComponent } from './activities/activities.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'details',
            component: DetailsComponent,
        },{
            path: 'result/:id',
            component: ResultComponent,
        },{
            path: 'activities/:id',
            component: ActivitiesComponent,
        }, {
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
export class DetailsRoutingModule { }

export const routedComponents = [
    DetailsComponent,
    ResultComponent,
    ActivitiesComponent
];

