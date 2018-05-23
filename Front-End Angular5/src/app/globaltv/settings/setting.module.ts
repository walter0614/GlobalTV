import { NgModule } from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SettingRoutingModule, routedComponents } from './setting-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    SettingRoutingModule,
    ToasterModule,
    TreeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    
  ],
  providers:[
    SmartTableService
  ]
})
export class SettingModule { }
