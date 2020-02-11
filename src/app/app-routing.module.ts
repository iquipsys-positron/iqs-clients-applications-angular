import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AuthGuard
} from 'iqs-libs-clientshell2-angular';
import { ApplicationsContainerComponent } from './applications/containers/applications-container/applications-container.component';

const appRoutes: Routes = [
    { path: '', component: ApplicationsContainerComponent, canActivate: [AuthGuard] },
    { path: '404', redirectTo: '' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
