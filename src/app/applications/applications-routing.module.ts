import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthGuard
} from 'iqs-libs-clientshell2-angular';
import { ApplicationsContainerComponent } from './containers/applications-container/applications-container.component';

export const routes: Routes = [
  { path: '', component: ApplicationsContainerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
