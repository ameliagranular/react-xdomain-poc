import { IActionCreator, IActionDispatcher } from '../../shared/models/ActionModel';
import { IOrgUsers } from './OrgUsersModel';
import { IPerson, IPeople } from '../../shared/models/PersonModel';
import { OrgUsersResource } from './OrgUsersResource';

// Action types
export enum USER_ACTIONS {
    USERS_LOAD = 'USERS_LOAD',
    USERS_UPDATE = 'USERS_UPDATE'
}

// Action creators
export type ILoadUsersAction = IActionCreator<IOrgUsers>;
export type IUpdateUsersAction = IActionCreator<IPeople>;

export const loadUsers: ILoadUsersAction =
    (data) => (
        {type: USER_ACTIONS.USERS_LOAD, payload: data}
    );

export const updateUsers: IUpdateUsersAction =
    (data) => (
        {type: USER_ACTIONS.USERS_UPDATE, payload: data}
    );

// Action dispatchers
export type IFetchOrgUsersAction = IActionDispatcher<void, IOrgUsers>;
export type IUpdateOrgUsersAction = IActionDispatcher<IPerson, IPeople>;

export const fetchOrgUsers: IFetchOrgUsersAction =
    () => {
        return async function (dispatch: any) {
            const orgUsers = await OrgUsersResource.get();
            dispatch(loadUsers(orgUsers));
        };
    };

export const updateOrgUsers: IUpdateOrgUsersAction = (person) => {
    return async function (dispatch: any) {
        const orgUsers = await OrgUsersResource.update(person);
        dispatch(updateUsers(orgUsers));
    };
};

