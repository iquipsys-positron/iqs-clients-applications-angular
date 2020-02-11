import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
} from '@angular/material';
import { MatProgressBarModule, MatButtonToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipPictureModule, PipCollageModule } from 'pip-webui2-pictures';
import { PipActionListModule, PipButtonToggleGroupModule } from 'pip-webui2-buttons';
import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipDocumentListModule } from 'pip-webui2-documents';

import { PipApplicationDetailsComponent } from './application-details.component';
import { LangFilterPipe } from '../pipes/lang-filter.pipe'

@NgModule({
  declarations: [
    PipApplicationDetailsComponent,
    LangFilterPipe
  ],
  imports: [
    PipDocumentLayoutModule,
    PipMediaModule,
    PipShadowModule,
    PipButtonToggleGroupModule,

    FlexLayoutModule,

    TranslateModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    PipPictureModule,
    PipActionListModule,
    PipDocumentListModule,
    PipCollageModule,

    PipEmptyStateModule
  ],
  exports: [
    PipApplicationDetailsComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipApplicationDetailsModule { }
