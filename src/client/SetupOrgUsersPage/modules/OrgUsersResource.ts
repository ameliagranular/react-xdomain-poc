import { getOrganizationUsers, saveOrganizationUsers } from '../../shared/services/OrganizationUsersService';

import { IOrgUsersRemote, IOrgUsersEntryRemote, IOrgUsers, IOrgUsersEntry } from './OrgUsersModel';
import { IPerson, IPersonRemote, IPeople, IPeopleRemote } from '../../shared/models/PersonModel';

class OrgUsersResource {

    public static async get(): Promise<IOrgUsers> {
        const res = await getOrganizationUsers();
        const converted = await this.convertOrgUserFromRemote(res.data);
        return converted;
    }

    public static async update(person: IPerson): Promise<IPeople> {
        const res = await saveOrganizationUsers(person);
        const converted = await this.convertPeopleFromRemote(res.data);
        return converted;
    }

    private static async convertOrgUserFromRemote(
        remote: IOrgUsersRemote
    ): Promise<IOrgUsers> {
        return {
            organization_users: remote.organization_users.map(
                (entry) => this.convertOrgUserEntryFromRemote(entry)
            )
        };
    }

    private static convertOrgUserEntryFromRemote(
        entry: IOrgUsersEntryRemote
    ): IOrgUsersEntry {
        return {
            contact_email: entry.contact_email,
            contact_phone: entry.contact_phone,
            country_code: entry.country_code,
            create_wo: entry.create_wo,
            finance_privilege: entry.finance_privilege,
            id: entry.id,
            is_active: entry.is_active,
            readonly : entry.readonly,
            role: entry.role,
            user: entry.user,
            user_id: entry.user_id,
            view_operators: entry.view_operators
        };
    }

    private static async convertPeopleFromRemote(
        remote: IPeopleRemote
    ): Promise<IPeople> {
        return {
            people: remote.people.map(
                (entry) => this.convertPersonFromRemote(entry)
            )
        };
    }

    private static convertPersonFromRemote(
        entry: IPersonRemote
    ): IPerson {
        return {
            applicator_license: entry.applicator_license || '',
            country_code: entry.country_code,
            create_wo: entry.create_wo,
            finance_privilege: entry.finance_privilege,
            first_name: entry.first_name,
            id: entry.id,
            is_active: entry.is_active,
            last_name: entry.last_name,
            phone: entry.phone,
            role_id: entry.role_id,
            username: entry.username,
            view_operators: entry.view_operators
        };
    }
}

export { OrgUsersResource };
