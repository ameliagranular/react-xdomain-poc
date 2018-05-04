import * as React from 'react';

import { OrgUsersCards } from '../OrgUserCards/OrgUsersCards';
import { IOrgUsersEntry } from '../../modules/OrgUsersModel';

export interface IManagersProps {
    orgUsers: IOrgUsersEntry[];
}

export const Managers: React.StatelessComponent<IManagersProps>
    = (props) => {
        return (
            <OrgUsersCards
                orgUsers={props.orgUsers}
            />
        );
    };
