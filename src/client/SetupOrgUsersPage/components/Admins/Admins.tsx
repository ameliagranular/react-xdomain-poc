import * as React from 'react';

import { OrgUsersCards } from '../OrgUserCards/OrgUsersCards';
import { IOrgUsersEntry } from '../../modules/OrgUsersModel';

export interface IAdminsProps {
    orgUsers: IOrgUsersEntry[];
}

export const Admins: React.StatelessComponent<IAdminsProps>
    = (props) => {
        return (
            <OrgUsersCards
                orgUsers={props.orgUsers}
            />
        );
    };
