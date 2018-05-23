import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { UserComponent } from './user/user.component'
import { User } from './shared/models/user.model';

const routes: Routes = [
  { path: 'globaltv', loadChildren: 'app/globaltv/globaltv.module#GlobalTVModule', canActivate:[AuthGuard] },
  {
    path: 'auth',
    component: UserComponent
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
