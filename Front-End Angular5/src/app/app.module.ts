/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { NgcFloatButtonModule } from 'ngc-float-button';

//<My Imports>
import { UserComponent } from './user/user.component';
import { UserService } from './shared/services/user.service';
import { SystemVariablesService } from './shared/services/system-variables.service';
import { MytoasterService } from './shared/services/mytoaster.service';
import { HistoryService } from './shared/services/history.service';
import { HistoryBusinessService } from './shared/business/history-business.service';
import { AuthGuard } from './auth/auth.guard';
import { CompetitionService } from './shared/services/competition.service';
import { CompetitionBusinessService } from './shared/business/competition-business.service';
import { ActivityService } from './shared/services/activity.service';
import { ActivityBusinessService } from './shared/business/activity-business.service';
import { EnvironmentService } from './shared/services/environment.service';
import { EnvironmentBusinessService } from './shared/business/environment-business.service';
import { ObjectService } from './shared/services/object.service';
import { ObjectBusinessService } from './shared/business/object-business.service';
import { SequenceService } from './shared/services/sequence.service';
import { SequenceBusinessService } from './shared/business/sequence-business.service';
import { PatientService } from './shared/services/patient.service';
import { PatientBusinessService } from './shared/business/patient-business.service';
import { PlayerSesionService } from './shared/services/player-sesion.service.';
import { PlayerSesionBusinessService } from './shared/business/player-sesion-business.service';
import { SmartTable } from './shared/services/smartTable.service';
import { RoleBusinessService } from './shared/business/role-business.service';
import { RoleService } from './shared/services/roles.service';
import { UserPersonService } from './shared/services/userPerson.service';
import { UserPersonBusinessService } from './shared/business/userPerson-business.service';
//</My Imports>
//Enabled Production Mode
//enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    //<My Components>
    UserComponent,
    //</My Components>
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2DragDropModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    //<My Services>
    UserService,
    HistoryService,
    HistoryBusinessService,
    CompetitionService,
    CompetitionBusinessService,
    ActivityService,
    ActivityBusinessService,
    EnvironmentService,
    EnvironmentBusinessService,
    ObjectService,
    ObjectBusinessService,
    SequenceService,
    SequenceBusinessService,
    PatientService,
    PatientBusinessService,
    PlayerSesionService,
    PlayerSesionBusinessService,
    SystemVariablesService,
    MytoasterService,
    SmartTable,
    RoleService,
    RoleBusinessService,
    UserPersonService,
    UserPersonBusinessService,
    //</My Services>
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AppModule {
}
