import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { findIndex } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as fromApplicationActions from './application.action';

import { ApplicationDataService } from '../services/application.data.service';
import { PipUpdateState } from '../models/application.data';
import { PipApplicationService } from '../services/application.service';
import { PipApplicationActionTypes, ApplicationsAction } from './application.action';

@Injectable()
export class PipApplicationEffects {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private applicationDataService: ApplicationDataService,
        private ApplicationService: PipApplicationService
    ) { }

    @Effect() application$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromApplicationActions.PipApplicationActionTypes.Applications,
                fromApplicationActions.PipApplicationActionTypes.ApplicationAbort
            ),
            switchMap((action: any) => {
                if (action.type = fromApplicationActions.PipApplicationActionTypes.Applications) {
                    return this.applicationDataService.apps()
                        .pipe(
                            map(data => {
                                return new fromApplicationActions.ApplicationSucessAction(data);
                            }),
                            catchError(error => of(new fromApplicationActions.ApplicationFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() applicationSuccess$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationSucess),
            map((action: any) => action.payload),
            map(payload => {
                const saveState = this.activatedRoute.snapshot.queryParams['state'];
                if (payload && payload.length > 0) {
                    let index: number = findIndex(payload, { id: this.activatedRoute.snapshot.queryParams['application_id'] });
                    index = index > -1 ? index : 0;
                    if (!saveState || saveState === PipUpdateState.View || saveState === PipUpdateState.Edit) {
                        return new fromApplicationActions.ApplicationDataAction({state: PipUpdateState.View, id: payload[index].id});
                    }
                    return new fromApplicationActions.ApplicationChangeStateAction(PipUpdateState.Create);
                }
                return new fromApplicationActions.ApplicationEmptyAction();
            })
        );

    @Effect() applicationData$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationData),
            map((action: any) => action.payload),
            map(payload => {
                return new fromApplicationActions.ApplicationSelectAction(payload.id);
            })
        );

    @Effect({ dispatch: false }) applicationChangeState$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationChangeState),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );

    @Effect({ dispatch: false }) applicationChangeCancel$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationChangeCancel),
            map((action: any) => action.payload),
            map(payload => {
                return new fromApplicationActions.ApplicationChangeCancelAction(payload);
            })
        );

    @Effect({ dispatch: false }) applicationSelect$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationSelect),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );

    @Effect() ApplicationUpdates$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationUpdates),
            switchMap((action: any) => {
                if (action.type = PipApplicationActionTypes.ApplicationUpdates) {
                    const payload = (<any>action).payload;
                    return this.applicationDataService.appUpdate(payload)
                        .pipe(
                            map(data => {
                                return new fromApplicationActions.ApplicationUpdatesSuccessAction(data);
                            }),
                            catchError(error => of(new fromApplicationActions.ApplicationUpdatesFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() applicationCreate$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationCreate),
            switchMap((action: any) => {
                if (action.type = PipApplicationActionTypes.ApplicationCreate) {
                    const payload = (<any>action).payload;
                    return this.applicationDataService.appCreate(payload)
                        .pipe(
                            map(data => {
                                return new fromApplicationActions.ApplicationCreateSuccessAction(data);
                            }),
                            catchError(error => of(new fromApplicationActions.ApplicationCreateFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() applicationCreateSuccess$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationCreateSuccess),
            map((action: any) => action.payload),
            map(payload => {
                const applicationId = payload ? payload.id : null;
                return new fromApplicationActions.ApplicationSelectAction(applicationId);
            })
        );

    @Effect() applicationDelete$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationDelete),
            switchMap((action: any) => {
                if (action.type = PipApplicationActionTypes.ApplicationDelete) {
                    const payload = (<any>action).payload;
                    return this.applicationDataService.appDelete(payload)
                        .pipe(
                            map(data => {
                                return new fromApplicationActions.ApplicationDeleteSuccessAction(payload);
                            }),
                            catchError(error => of(new fromApplicationActions.ApplicationDeleteFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() applicationDeleteSuccess$ = this.actions$
        .pipe(
            ofType(PipApplicationActionTypes.ApplicationDeleteSuccess),
            map((action: any) => action.payload),
            map(payload => {
                return new fromApplicationActions.ApplicationSelectAction(null);
            })
        );
}
