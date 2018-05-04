// Remote
export interface IPeopleRemote {
    people: IPersonRemote[];
}

export interface IPersonRemote {
    applicator_license?: string;
    country_code: string;
    create_wo: boolean;
    finance_privilege: boolean;
    first_name: string;
    id: string;
    image_url: string;
    ink_original_upload_url: string;
    is_active: boolean;
    last_name: string;
    organization_user_id: string;
    phone: string;
    profile_picture_url: string;
    readonly: boolean;
    role_id: string;
    username: string;
    view_operators: boolean;
}

// Local

export interface IPeople {
    people: IPerson[];
}

export interface IPerson {
    applicator_license: string;
    country_code?: string;
    confirm_password?: string; // O_o
    create_wo: boolean;
    finance_privilege: boolean;
    first_name: string;
    id: string;
    is_active: boolean;
    last_name: string;
    password?: string; // O_o
    phone: string;
    role_id: string;
    username: string;
    view_operators: boolean;
}
