/**
 * A service that provides access to Organization Users
 */

import {
    ajaxCall,
    ajaxClearCache,
} from './AjaxService';
import { getEndpoint } from './EndpointService';
import { IPerson } from '../models/PersonModel';

const GET_ORG_USERS_ENDPOINT = '/ajax/shared/get_organization_users';

export async function getOrganizationUsers(): Promise<any> {
    const data: any = {
        roles: []
    };

    const url = getEndpoint(GET_ORG_USERS_ENDPOINT, {});

    const res = await ajaxCall({ method: 'post', url, data: data }, { useCache: true });

    return res.data;
}


export async function saveOrganizationUsers(person: IPerson): Promise<any> {
    const data: any = {
        person: person
    };

    const url = getEndpoint('/ajax/resources_people/edit', {});

    const res = await ajaxCall({ method: 'post', url, data: data });
    ajaxClearCache({method: 'post', url: GET_ORG_USERS_ENDPOINT, data: { roles: []}});
    return res.data;
}
