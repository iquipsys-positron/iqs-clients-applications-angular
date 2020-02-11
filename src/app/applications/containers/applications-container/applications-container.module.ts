import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatDialogModule, MatProgressBarModule, MatDialog } from '@angular/material';
import { MatListModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { PipEmptyStateModule } from 'pip-webui2-controls';
import {
    PipAppbarModule,
    PipRightnavModule,
    PipMediaModule,
    PipSidenavModule,
    PipMenuLayoutModule,
    PipShadowModule,
    PipDocumentLayoutModule,
} from 'pip-webui2-layouts';
import { PipThemesModule } from 'pip-webui2-themes';
import { IqsAskDialogModule, IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular';

import { ApplicationsContainerComponent } from './applications-container.component';
import { PipApplicationDetailsModule } from '../../components/application-details/application-details.module';
import { PipApplicationListModule } from '../../components/application-list/application-list.module';
import { PipApplicationEffects } from '../../store/application.effects';
import { pipApplicationReducer, InitialPipApplicationState } from '../../store/application.reducer';
import { PipApplicationService } from '../../services/application.service';


@NgModule({
    declarations: [
        ApplicationsContainerComponent
    ],
    entryComponents: [
        IqsAskDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,

        TranslateModule.forRoot(),
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDialogModule,

        PipThemesModule.forRoot(),
        PipAppbarModule,
        PipRightnavModule.forRoot(),
        PipMediaModule.forRoot(),
        PipSidenavModule.forRoot(),
        PipMenuLayoutModule,
        PipShadowModule,
        PipEmptyStateModule,
        PipDocumentLayoutModule,

        PipApplicationDetailsModule,
        PipApplicationListModule,

        IqsAskDialogModule,

        EffectsModule.forFeature([
            PipApplicationEffects
        ]),
        StoreModule.forFeature(
            'application',
            pipApplicationReducer,
            {
                initialState: InitialPipApplicationState
            }
        ),
    ],
    exports: [
        ApplicationsContainerComponent
    ],
    providers: [
        PipApplicationService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationsContainerModule { }
