import { IAction } from '../../shared/models/ActionModel';
import { IOrgUsers } from './OrgUsersModel';

import { USER_ACTIONS } from './OrgUsersActions';

export interface IState {
    loaded: boolean;
    data: IOrgUsers;
}

const initState: IState = {
    loaded: false,
    data: null
};

export const OrgUsersReducer = (state = initState, action: IAction<any>): IState  => {
    switch (action.type) {
        case USER_ACTIONS.USERS_LOAD:
            return {...state, data: action.payload, loaded: true};

        case USER_ACTIONS.USERS_UPDATE:
            return {...state, data: action.payload, loaded: true};
        default:
            return state;
    }
};
