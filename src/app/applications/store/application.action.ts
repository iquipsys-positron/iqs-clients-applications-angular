import { Action } from '@ngrx/store';

export enum PipApplicationActionTypes {
    Applications = '[Content] Application',
    ApplicationAbort = '[Content] Application Abort',
    ApplicationEmpty = '[Content] Application Empty',
    ApplicationData = '[Content] Application Data',
    ApplicationSucess = '[Content] Application Success',
    ApplicationFailure = '[Content] Application Failure',
    ApplicationSelect = '[Content] Application Select',
    ApplicationChangeState = '[Content] Application Change state',
    ApplicationCreate = '[Content] Application Create',
    ApplicationCreateSuccess = '[Content] Application Create Success',
    ApplicationCreateFailure = '[Content] Application Create Failure',
    ApplicationChangeCancel = '[Content] Application Edit/Create/Delete Cancel',
    ApplicationUpdates = '[Content] Application Update',
    ApplicationUpdatesSuccess = '[Content] Application Update Success',
    ApplicationUpdatesFailure = '[Content] Application Update Failure',
    ApplicationDelete = '[Content] Delete Application ',
    ApplicationDeleteSuccess = '[Content] Delete Application  Success',
    ApplicationDeleteFailure = '[Content] Delete Application Failure'
}

export class ApplicationsAction implements Action {
    readonly type = PipApplicationActionTypes.Applications;

    constructor() { }
}

export class ApplicationAbortAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationAbort;

    constructor(public payload: any) { }
}

export class ApplicationEmptyAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationEmpty;

    constructor() { }
}

export class ApplicationDataAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationData;

    constructor(public payload: any) { }
}

export class ApplicationSucessAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationSucess;

    constructor(public payload: any) { }
}

export class ApplicationFailureAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationFailure;

    constructor(public payload: any) { }
}

export class ApplicationSelectAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationSelect;

    constructor(public payload: any) { }
}

export class ApplicationChangeStateAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationChangeState;

    constructor(public payload: any) { }
}

export class ApplicationCreateAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationCreate;

    constructor(public payload: any) { }
}

export class ApplicationCreateSuccessAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationCreateSuccess;

    constructor(public payload: any) { }
}

export class ApplicationCreateFailureAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationCreateFailure;

    constructor(public payload: any) { }
}

export class ApplicationUpdatesAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationUpdates;

    constructor(public payload: any) { }
}

export class ApplicationUpdatesSuccessAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationUpdatesSuccess;

    constructor(public payload: any) { }
}

export class ApplicationUpdatesFailureAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationUpdatesFailure;

    constructor(public payload: any) { }
}

export class ApplicationChangeCancelAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationChangeCancel;

    constructor(public payload: any) { }
}

export class ApplicationDeleteAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationDelete;

    constructor(public payload: any) { }
}

export class ApplicationDeleteSuccessAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationDeleteSuccess;

    constructor(public payload: any) { }
}

export class ApplicationDeleteFailureAction implements Action {
    readonly type = PipApplicationActionTypes.ApplicationDeleteFailure;

    constructor(public payload: any) { }
}

export type ApplicationAction = ApplicationsAction
    | ApplicationAbortAction
    | ApplicationEmptyAction
    | ApplicationDataAction
    | ApplicationSucessAction
    | ApplicationFailureAction
    | ApplicationSelectAction
    | ApplicationChangeStateAction
    | ApplicationCreateAction
    | ApplicationCreateSuccessAction
    | ApplicationCreateFailureAction
    | ApplicationUpdatesAction
    | ApplicationUpdatesSuccessAction
    | ApplicationUpdatesFailureAction
    | ApplicationChangeCancelAction
    | ApplicationDeleteAction
    | ApplicationDeleteSuccessAction
    | ApplicationDeleteFailureAction;
