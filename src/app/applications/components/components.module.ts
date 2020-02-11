import { NgModule } from '@angular/core';
import { PipApplicationListModule } from './application-list/application-list.module';
import { PipApplicationDetailsModule } from './application-details/application-details.module';


@NgModule({
  imports: [
    PipApplicationListModule,
    PipApplicationDetailsModule
  ] 
})
export class ApplicationsComponentsModule { }