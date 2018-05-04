import * as React from 'react';

import { OrgUsersCards } from '../OrgUserCards/OrgUsersCards';
import { IOrgUsersEntry } from '../../modules/OrgUsersModel';

export interface IOperatorsProps {
    orgUsers: IOrgUsersEntry[];
}

export const Operators: React.StatelessComponent<IOperatorsProps>
    = (props) => {
        return (
            <OrgUsersCards
                orgUsers={props.orgUsers}
            />
        );
    };
