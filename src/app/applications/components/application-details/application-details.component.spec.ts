import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PipApplicationDetailsComponent } from './application-details.component';
import { PipApplicationDetailsModule } from './application-details.module';
import { ApplicationDataService } from '../../services/application.data.service';
import { PipApplicationService } from '../../services/application.service';

describe('a application-details component', () => {
    let component: PipApplicationDetailsComponent;
    let fixture: ComponentFixture<PipApplicationDetailsComponent>;
 
    // instantiation through framework injection
 

    it('should have an instance', async(() => {
        // TestBed.configureTestingModule({
        //     imports: [
        //         PipApplicationDetailsModule,
        //         TranslateModule.forRoot(),
        //     ],
        //     providers: [
        //         ApplicationDataService,
        //         PipApplicationService
        //     ]
        // })
        // .compileComponents();
        // fixture = TestBed.createComponent(PipApplicationDetailsComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    }));
});
