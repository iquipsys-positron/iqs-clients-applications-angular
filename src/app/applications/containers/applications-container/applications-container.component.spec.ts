import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsContainerComponent } from './applications-container.component';
import { PipEntryConfig, PipEntryConfigService, EntryService } from '@iquipsys/pip-suite2-entry';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule, MatButtonModule, MatIconModule, MatListModule, MatSlideToggleModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { PipMediaModule, PipMenuLayoutModule, PipShadowModule, PipDocumentLayoutModule, PipSidenavModule } from 'pip-webui2-layouts';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipApplicationDetailsModule } from '../../components/application-details/application-details.module';
import { PipApplicationListModule } from '../../components/application-list/application-list.module';
import { PipNavModule, PipNavService } from 'pip-webui2-nav';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageModule } from 'angular-2-local-storage';
// import { ApplicationActions } from '../../store/application.state';
import { PipApplicationService } from '../../services/application.service';
import { ApplicationDataService } from '../../services/application.data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IqsAskDialogModule, IqsAskDialogComponent } from '@iquipsys/iqs-admin-shell'

// describe('ApplicationsContainerComponent', () => {
//   let component: ApplicationsContainerComponent;
//   let fixture: ComponentFixture<ApplicationsContainerComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ApplicationsContainerComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ApplicationsContainerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('ApplicationsContainerComponent', () => {
  let component: ApplicationsContainerComponent;
  let fixture: ComponentFixture<ApplicationsContainerComponent>;
  const mockRouter = {
      navigate: jasmine.createSpy('navigate')
  };
  const mockActivatedRoute = {
      snapshot: {
          queryParams: {
              state: null,
              single: false
          }
      }
  };
  const entryConfig: PipEntryConfig = <PipEntryConfig>{
      autorizeState: 'application',
      url: 'http://api.positron.stage.iquipsys.net:30018'
  };

  const configService = new PipEntryConfigService(entryConfig);

  // register all needed dependencies
  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [
              ApplicationsContainerComponent,
              IqsAskDialogComponent
          ],
          imports: [
              CommonModule,
              HttpClientModule,
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

              PipMediaModule.forRoot(),
              PipMenuLayoutModule,
              PipShadowModule,
              PipEmptyStateModule,
              PipDocumentLayoutModule,
              // PipDocumentListModule,
              PipSidenavModule.forRoot(),

              PipApplicationDetailsModule,
              PipApplicationListModule,
              PipNavModule.forRoot(),

              StoreModule.forRoot({}),
              EffectsModule.forRoot([]),
              LocalStorageModule.withConfig({
                  prefix: 'my-app',
                  storageType: 'localStorage'
              })
          ],
          providers: [
              PipNavService,
            //   ApplicationActions,
              PipApplicationService,
              ApplicationDataService,
              EntryService,
              {
                  provide: PipEntryConfigService,
                  useValue: configService
              },
              {
                  provide: Router,
                  useValue: mockRouter
              },
              {
                  provide: ActivatedRoute,
                  useValue: mockActivatedRoute
              }
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });
      fixture = TestBed.createComponent(ApplicationsContainerComponent);
      component = fixture.componentInstance;
  });

  it('should have an instance', () => {
      expect(component).toBeDefined();
  });

  
});
