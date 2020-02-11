import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ApplicationsModule } from './applications/applications.module';
import { IqsShellContainerComponent, IqsShellModule } from 'iqs-libs-clientshell2-angular';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        // application modules
        IqsShellModule.forRoot(),
        AppRoutingModule,
        ApplicationsModule
    ],
    bootstrap: [IqsShellContainerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class AppModule { }

