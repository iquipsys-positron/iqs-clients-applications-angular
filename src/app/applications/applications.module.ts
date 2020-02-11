import { NgModule } from '@angular/core';
import { ApplicationsContainersModule } from './containers/containers.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PipApplicationEffects } from './store/application.effects';
import { pipApplicationReducer } from './store/application.reducer';
import { ApplicationDataService } from './services/application.data.service';
import { PipApplicationService } from './services/application.service';
import { ApplicationsComponentsModule } from './components/components.module';

@NgModule({
    imports: [
        ApplicationsContainersModule,
        ApplicationsComponentsModule,
        EffectsModule.forFeature([PipApplicationEffects]),
        StoreModule.forFeature('application', pipApplicationReducer),
    ],
    providers: [
        PipApplicationService,
        ApplicationDataService,
    ],
})
export class ApplicationsModule { }
