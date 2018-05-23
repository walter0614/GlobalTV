import { NgModule } from '@angular/core';
import { ToasterModule } from 'angular2-toaster';


import { ThemeModule } from '../../../@theme/theme.module';
import { DetailsRoutingModule, routedComponents } from './details-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    DetailsRoutingModule,
    ToasterModule
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    
  ],
})
export class DetailsModule { }
