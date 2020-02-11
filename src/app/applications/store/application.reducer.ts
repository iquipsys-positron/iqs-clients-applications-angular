import { Map, fromJS } from 'immutable';
import { cloneDeep, filter, findIndex, union } from 'lodash';

import { PipApplicationState } from './application.state';
import { PipUpdateState } from '../models/application.data';
import { PipApplicationActionTypes, ApplicationAction } from './application.action';

import * as _ from 'lodash';

export const InitialPipApplicationState: PipApplicationState = {
    applications: [],
    selectId: null,
    updateState: null,
    loading: null,
    error: null,
    isSingle: false,
    urlState: {}
};


export function pipApplicationReducer(
    state = InitialPipApplicationState, 
    action: ApplicationAction
): PipApplicationState {
    switch (action.type) {
        case PipApplicationActionTypes.Applications:
            let map = fromJS(state);
            map = map.set('applications', []);
            map = map.set('error', null);
            map = map.set('loading', true);
            map = map.set('updateState', PipUpdateState.Progress);
            
            return map.toJS();

        case PipApplicationActionTypes.ApplicationAbort:
            let updateState = state.applications && state.applications.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;
  
            return { ...state, updateState: updateState, loading: false, error: null };

        case PipApplicationActionTypes.ApplicationSucess:
            map = fromJS(state);
            let applicationSucess = action.payload;
            if (!applicationSucess) {
                applicationSucess = [];
            }

            map = map.set('applications', applicationSucess);
            map = map.set('error', null);
            map = map.set('loading', false);
 
            return map.toJS();
  

        case PipApplicationActionTypes.ApplicationData:
 
            return { ...state, updateState:  action.payload.state };

        case PipApplicationActionTypes.ApplicationEmpty:
            return { ...state, updateState: PipUpdateState.Empty, applications: [], selectId: null };


        case PipApplicationActionTypes.ApplicationFailure:
            return { ...state, error: action.payload, loading: false };


        case PipApplicationActionTypes.ApplicationSelect:
            let id = null;
            const oldId = state.selectId;
            const collection = state.applications;

            if (collection && collection.length > 0) {
                let index = _.findIndex(collection, (item) => item.id === action.payload);
                if (index === -1) {
                    const oldIndex = _.findIndex(collection, (item) => item.id === oldId);
                    if (oldIndex === -1) {
                        index = 0;
                    } else {
                        index = oldIndex < collection.length ? oldIndex : oldIndex - 1;
                    }

                    id = collection[index] ? collection[index].id : null;
                } else {
                    id = action.payload;
                }
            }
            let changes: any = { };
            if (state.selectId !== id) {
                changes.error = null;
            }
            changes.selectId = id;
            changes.updateState = (!state.applications || state.applications.length === 0) ? PipUpdateState.Empty : PipUpdateState.View

            return Object.assign({}, state, changes)

        case PipApplicationActionTypes.ApplicationChangeState:
            return { ...state, updateState: action.payload, error: null };

        case PipApplicationActionTypes.ApplicationUpdates:
            return { ...state, loading: true, error: null };

        case PipApplicationActionTypes.ApplicationUpdatesSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const updateIndex = _.findIndex(state.applications, { id: action.payload.id }),
                updateDevices = state.applications;
            updateDevices[updateIndex] = action.payload;
            map = map.set('applications', updateDevices);
            
            return map.toJS();

        case PipApplicationActionTypes.ApplicationUpdatesFailure:
            return { ...state, loading: false, error: action.payload };

        case PipApplicationActionTypes.ApplicationChangeCancel:
            const stateAfterCancel = state.applications && state.applications.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;
            return {
                ...state,
                updateState: stateAfterCancel,
                error: null,
                loading: false
            };

        case PipApplicationActionTypes.ApplicationCreate:
            
            return { ...state, loading: true, error: null };

        case PipApplicationActionTypes.ApplicationCreateSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const createDevices = state.applications;
            createDevices.push(action.payload);
            map = map.set('applications', createDevices);

            return map.toJS();

        case PipApplicationActionTypes.ApplicationCreateFailure:
            return { ...state, loading: false, error: action.payload };

        case PipApplicationActionTypes.ApplicationDelete:
            return { ...state, loading: true, error: null };


        case PipApplicationActionTypes.ApplicationDeleteSuccess:
            map = fromJS(state);
            map = map.set('error', null);
            map = map.set('loading', false);
            const devices = _.filter(_.cloneDeep(state.applications), element => element.id !== action.payload);
            map = map.set('applications', devices);
            map = map.set('updateState', devices && devices.length > 0 ? PipUpdateState.View : PipUpdateState.Empty);

            return map.toJS();

        case PipApplicationActionTypes.ApplicationDeleteFailure:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
