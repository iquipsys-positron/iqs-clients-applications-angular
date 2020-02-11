import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Application } from '../models/application.data';
import { ApplicationDataService } from './application.data.service';

import * as _ from 'lodash';
import { getApplicationError, getApplicationLoading, getApplicationUpdateState, getApplicationApplications, getApplicationSelectedId, getApplicationIsSingle } from '../store/application.state';
import { ApplicationAbortAction, ApplicationsAction, ApplicationSelectAction, ApplicationChangeStateAction, ApplicationCreateAction, ApplicationUpdatesAction, ApplicationDeleteAction, ApplicationChangeCancelAction } from '../store/application.action';

@Injectable()
export class PipApplicationService {

    constructor(
        private applicationDataService: ApplicationDataService,
        private store: Store<any>
    ) { }


    public get error$(): Observable<string> {
        return this.store.select<any>(getApplicationError);
    }

    public get loading$(): Observable<boolean> {
        return this.store.select<any>(getApplicationLoading);
    }

    public get updateState$(): Observable<string> {
        return this.store.select<any>(getApplicationUpdateState);
    }

    public get isSingle$(): Observable<boolean> {
        return this.store.select<any>(getApplicationIsSingle);
    }

    public get applications$(): Observable<Application[]> {
        // return this.store.select<any>(getApplicationApplications);
        return this.store.select(getApplicationApplications).pipe(
            // rxjs can't compare deep, so this is some kind of verification our object is changed
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        );
    }

    public get selectId$(): Observable<string> {
        return this.store.select<any>(getApplicationSelectedId);
    }

    public get selectApplication$() {
        return this.store.select<any>((state) => {
            const id: string = state.application.selectId;
            const applications = state.application.applications;
            if (applications && id) {
                for (const application of applications) {
                    if (application.id === id) {
                        return application;
                    }
                }
            }
            return null;
        });
    }

    public application(): void {
        this.store.dispatch(new ApplicationsAction());
    }

    public applicationSelect(id: string): void {
        this.store.dispatch(new ApplicationSelectAction(id));
    }

    public applicationChangeState(state: string): void {
        this.store.dispatch(new ApplicationChangeStateAction(state));
    }

    public applicationCreate(application: Application) {
        this.store.dispatch(new ApplicationCreateAction(application));
    }

    public ApplicationUpdates(application: Application) {
        this.store.dispatch(new ApplicationUpdatesAction(application));
    }

    public applicationDelete(id: string) {
        this.store.dispatch(new ApplicationDeleteAction(id));
    }

    public applicationChangeCancel(applications: Application[]) {
        this.store.dispatch(new ApplicationChangeCancelAction(applications));
    }

    public getNewApplication(): Application {
        return new Application();
    }

}
