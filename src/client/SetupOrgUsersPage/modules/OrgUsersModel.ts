import { IUser } from '../../shared/models/UserModel';
import { IRole } from '../../shared/models/RoleModel';

// Remote

export interface IOrgUsersEntryRemote {
    applicator_license?: string;
    contact_email?: string;
    contact_phone: string;
    country_code: string;
    create_wo: boolean;
    finance_privilege: boolean;
    id: string;
    is_active: boolean;
    readonly: boolean;
    role: IRole;
    user: IUser;
    user_id: string;
    view_operators: boolean;
}

export interface IOrgUsersRemote {
    organization_users: IOrgUsersEntryRemote[];
}

// Local

export interface IOrgUsersEntry {
    applicator_license?: string;
    contact_email?: string;
    contact_phone: string;
    country_code: string;
    create_wo: boolean;
    finance_privilege: boolean;
    id: string;
    is_active: boolean;
    readonly: boolean;
    role: IRole;
    user: IUser;
    user_id: string;
    view_operators: boolean;
}

export interface IOrgUsers {
    organization_users: IOrgUsersEntry[];
}
