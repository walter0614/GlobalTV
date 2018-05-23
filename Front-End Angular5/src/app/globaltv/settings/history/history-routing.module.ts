import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import { SequenceComponent } from './sequence/sequence.component';

const routes: Routes = [{
    path: '',
    //component: HistoryComponent,
    children: [{
        path: 'histories',
        component: HistoryComponent,
    },{
        path: 'sequence/:id',
        component: SequenceComponent,
    }, {
        path: '',
        redirectTo: 'histories',
        pathMatch: 'full',
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoryRoutingModule { }

export const routedComponents = [
    HistoryComponent,
    SequenceComponent
];

