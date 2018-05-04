import { applyMiddleware, combineReducers, createStore } from 'redux';
import { IState as IOrgUsersReducerState, OrgUsersReducer } from './modules/OrgUsersReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

export interface IState {
    orgUsers: IOrgUsersReducerState;
}

const combinedReducer = combineReducers({
    orgUsers: OrgUsersReducer
});

export const Store = createStore(
    combinedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
