import * as React from 'react';
import * as Loader from 'react-loader';

import {IOrgUsersEntry} from '../../modules/OrgUsersModel';
import { Card } from './Card';
import './OrgUsersCards.scss';
import { saveOrganizationUsers } from '../../../shared/services/OrganizationUsersService';
import { IPersonRemote } from '../../../shared/models/PersonModel';

export interface IUpdateOrgUserForm {
    selectedRole: string;
    username: string;
    contact_phone: string;
    first_name: string;
    last_name: string;
    create_wo: boolean;
    view_operators: boolean;
    finance_privilege: boolean;
    applicator_license: string;
    id: string;
}

export interface IOrgUsersCardsProps {
    orgUsers: IOrgUsersEntry[];
}

export interface IOrgUsersCardsState {
    orgUsers: IOrgUsersEntry[];
    editingId: any;
    saveInProgress?: boolean;
}

export class OrgUsersCards extends React.Component<IOrgUsersCardsProps, IOrgUsersCardsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            orgUsers: props.orgUsers,
            editingId: null,
            saveInProgress: false
        };
    }

    public toggleEditMode(userId: string) {
        this.setState({
            editingId: this.state.editingId === userId ? null : userId
        });
    }

    public async handleSubmit(event: any) {
        event.preventDefault();

        this.setState({
            saveInProgress: true
        });

        const form = event.target;

        const formData = {
            role_id: form.selectedRole.value,
            username: form.username.value,
            phone: form.contact_phone.value,
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            create_wo: form.create_wo.checked,
            view_operators: form.view_operators.checked,
            finance_privilege: form.finance_privilege.checked,
            applicator_license: form.applicator_license.value,
            is_active: true,
            id: form.id.value
        };

        this.toggleEditMode(form.id.value);

        const response = await saveOrganizationUsers(formData);

        this.setState({
            saveInProgress: false
        });

        const updatedUser = response.data.people.filter((person: IPersonRemote) => {
            return person.id === formData.id;
        });

        this.updateUser(updatedUser[0]);
    }

    public render() {
        const editingId = this.state.editingId;
        const onSubmitHandler: (event: any) => void = this.handleSubmit.bind(this);
        const loaderOptions = {
                lines: 10,
                length: 20,
                width: 10,
                radius: 30,
                scale: .80,
                corners: 1,
                color: '#000',
                opacity: 0.25,
                rotate: 0,
                direction: 1,
                speed: 1,
                trail: 60,
                fps: 20,
                zIndex: 2e9,
                top: '10%',
                left: '50%',
                shadow: true,
                hwaccel: false,
                position: 'absolute'
            };

        return (
            <div className="OrgUserCards_Container">
                <Loader loaded={!this.state.saveInProgress} options={loaderOptions} className="spinner" />

            {
                this.state.orgUsers.map((user) => (
                    <Card
                        clickHandler={this.toggleEditMode.bind(this, user.user_id)}
                        submitHandler={onSubmitHandler}
                        key={user.user_id}
                        editMode={user.user_id === editingId}
                        orgUser={user}
                    />
                ))
            }
            </div>
        );
    }

    private updateUser(person: IPersonRemote) {
        const updatedOrgUser: any = {};

        const orgUser: IOrgUsersEntry = this.state.orgUsers.find((o) => {
            return o.user_id === person.id;
        });

        const updatedOrgUsers = this.state.orgUsers.slice();

        Object.assign(updatedOrgUser, orgUser);

        updatedOrgUser.user.last_name = person.last_name;
        updatedOrgUser.user.first_name = person.first_name;
        updatedOrgUser.finance_privilege = person.finance_privilege;
        updatedOrgUser.create_wo = person.create_wo;
        updatedOrgUser.user.username = person.username;
        updatedOrgUser.applicator_license = person.applicator_license;
        updatedOrgUser.contact_phone = person.phone;

        updatedOrgUsers.splice(updatedOrgUsers.indexOf(orgUser), 1, updatedOrgUser);

        this.setState({
            orgUsers: updatedOrgUsers
        });
    }
}

