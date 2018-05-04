export interface IUser {
    applicator_license?: string;
    create_date: string;
    first_name: string;
    id: string;
    image_url: string;
    ink_original_upload_url: string;
    last_name: string;
    preferences: IUserPref;
    profile_picture_url: string;
    username: string;
}

export interface IUserPref {
    id: string;
    timezone: string;
}
