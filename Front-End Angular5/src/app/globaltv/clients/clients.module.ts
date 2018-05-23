import { NgModule } from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { ClientsRoutingModule, routedComponents } from './clients-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ClientsRoutingModule,
    ToasterModule,
    TreeModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ClientsModule { }
