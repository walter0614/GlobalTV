import { NgModule } from '@angular/core';
import { ToasterModule } from 'angular2-toaster';


import { ThemeModule } from '../../../@theme/theme.module';
import { HistoryRoutingModule, routedComponents } from './history-routing.module';
import { Ng2DragDropModule } from 'ng2-drag-drop';

@NgModule({
  imports: [
    ThemeModule,
    HistoryRoutingModule,
    ToasterModule,
    Ng2DragDropModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    
  ],
})
export class HistoryModule { }
