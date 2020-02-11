import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Application } from '../models/application.data';

export class PipApplicationState {
    public applications: Application[];
    public loading: boolean;
    public updateState: string;
    public error: any;
    public selectId: string;
    public urlState: any;
    public isSingle: boolean;
}


export const getApplicationsStoreState = createFeatureSelector<PipApplicationState>('application');

export const getApplicationApplications = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.applications);
export const getApplicationLoading = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.loading);
export const getApplicationUpdateState = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.updateState);
export const getApplicationError = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.error);
export const getApplicationSelectedId = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.selectId);
export const getApplicationUrlState = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.urlState);
export const getApplicationIsSingle = createSelector(getApplicationsStoreState, (state: PipApplicationState) => state.isSingle);