import * as React from 'react';

import { IOrgUsersEntry } from '../../modules/OrgUsersModel';
import { IUpdateOrgUserForm } from './OrgUsersCards';

interface ICardState {
    editMode: boolean;
    orgUser: IOrgUsersEntry;
    updateOrgUserForm: IUpdateOrgUserForm;
}

interface ICardProps {
    editMode: boolean;
    orgUser: IOrgUsersEntry;
    clickHandler: () => {};
    submitHandler: (form: any) => void;
}

class Card extends React.Component<ICardProps, ICardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            editMode: props.editMode,
            orgUser: props.orgUser,
            updateOrgUserForm: {
                selectedRole: props.orgUser.role.id,
                id: props.orgUser.user_id,
                username: props.orgUser.user.username,
                contact_phone: props.orgUser.contact_phone,
                first_name: props.orgUser.user.first_name,
                last_name: props.orgUser.user.last_name,
                create_wo: props.orgUser.create_wo,
                view_operators: props.orgUser.view_operators,
                finance_privilege: props.orgUser.finance_privilege,
                applicator_license: props.orgUser.user.applicator_license || ''
            }
        };
    }

    public componentWillReceiveProps(nextProps: ICardProps) {
        this.setState({
            editMode: nextProps.editMode
        });
    }

    public handleInputChange (changeEvent: any) {
        const target = changeEvent.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const updatedForm: any = this.state.updateOrgUserForm;

        updatedForm[name] = value;

        this.setState({
            updateOrgUserForm: updatedForm
        });
    }

    public preventBubble (event: any) {
        event.stopPropagation();
    }

    public editableRow() {
        const orgUser = this.props.orgUser;
        const userImgUrl = orgUser.user.profile_picture_url ? orgUser.user.profile_picture_url : orgUser.user.image_url;
        const hasFinancialPriv = orgUser.finance_privilege ? 'Yes' : 'No';

        if (!this.state.editMode) {
            return (
                <div className="OrgUserCard" onClick={this.props.clickHandler}>
                    <div className="OrgUserCard_Name flex-column-2">
                        <img className="profileImg" src={userImgUrl} />
                        <div className="nameContainer">
                            <div className="label">Name</div>
                            <span className="formattedName">
                                {orgUser.user.first_name} {orgUser.user.last_name}
                            </span>
                        </div>
                    </div>
                    <div className="OrgUserCard_Email flex-column-2">
                        <div className="label">Email</div>
                        {orgUser.user.username}
                    </div>
                    <div className="OrgUserCard_Phone flex-column-1">
                        <div className="label">Phone</div>
                        {orgUser.contact_phone}
                    </div>
                    <div className="OrgUserCard_AppLicense flex-column-1">
                        <div className="label">Applicator License #</div>
                        {orgUser.user.applicator_license}
                    </div>
                    <div className="OrgUserCard_RolePerms flex-column-2">
                        <div className="label">Mobile Permissions</div>
                        {orgUser.create_wo &&
                        <div>&middot; View Other Operators, Activity Feed and Inventory</div>
                        }
                        {orgUser.view_operators &&
                        <div>&middot; View Tasks and Create Work Orders</div>
                        }
                    </div>
                    <div className="OrgUserCard_FinPerms flex-column-1">
                        <div className="label">Financial Privileges</div>
                        <div>&middot; {hasFinancialPriv}</div>

                    </div>
                </div>
            );
        } else {
            const roleOptions = [
                {
                    label: 'Operator',
                    value: '0115a8cb-7fa9-42fe-b037-4718eb2e8975',
                    desc: 'mobile access only.'
                },
                {
                    label: 'Manager',
                    value: '5062749f-c814-4370-b2be-1dd7e5b86bac',
                    desc: 'mobile, web and financial access; ability to add and edit users.'
                },
                {
                    label: 'Administrator',
                    value: 'aad2ddf1-e9c4-4d4a-84b3-a19c49f3f0f4',
                    desc: 'mobile, web and financial access; ability to add and edit users.'
                }
            ];

            const onChangeHandler: (event: any) => void = this.handleInputChange.bind(this);

            return (
                <form onSubmit={this.props.submitHandler}>
                    <div className="OrgUserCard editMode" onClick={this.props.clickHandler}>
                        <div className="primary-row">
                            <div className="OrgUserCard_Name flex-column-2" onClick={this.preventBubble}>
                                <img className="profileImg" src={userImgUrl}/>
                                <div className="nameContainer">
                                    <div className="label">Name</div>
                                    <input
                                        className="input input-sm"
                                        name="first_name"
                                        value={this.state.updateOrgUserForm.first_name}
                                        onChange={onChangeHandler}
                                    />
                                    <input
                                        className="input input-sm"
                                        name="last_name"
                                        value={this.state.updateOrgUserForm.last_name}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="OrgUserCard_Email flex-column-1" onClick={this.preventBubble}>
                                <div className="label">Email</div>
                                <input
                                    className="input input-sm"
                                    name="username"
                                    value={this.state.updateOrgUserForm.username}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="OrgUserCard_Phone flex-column-1" onClick={this.preventBubble}>
                                <div className="label">Phone</div>
                                <input
                                    className="input input-sm"
                                    name="contact_phone"
                                    value={this.state.updateOrgUserForm.contact_phone}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="OrgUserCard_AppLicense flex-column-1" onClick={this.preventBubble}>
                                <div className="label">Applicator License #</div>
                                <input
                                    className="input input-sm"
                                    name="applicator_license"
                                    value={this.state.updateOrgUserForm.applicator_license}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="OrgUserCard_RolePerms flex-column-2" onClick={this.preventBubble}>
                                <div className="label">Mobile Permissions</div>
                                <div>
                                    <input
                                        name="create_wo"
                                        type="checkbox"
                                        value={this.state.updateOrgUserForm.create_wo.toString()}
                                        checked={this.state.updateOrgUserForm.create_wo}
                                        onChange={onChangeHandler}
                                    /> View Tasks and Create Work Orders
                                </div>
                                <div>
                                    <input
                                        name="view_operators"
                                        type="checkbox"
                                        value={this.state.updateOrgUserForm.view_operators.toString()}
                                        checked={this.state.updateOrgUserForm.view_operators}
                                        onChange={onChangeHandler}
                                    />  View Other Operators, Activity Feed and Inventory
                                </div>
                            </div>
                            <div className="OrgUserCard_FinPerms flex-column-1" onClick={this.preventBubble}>
                                <div className="label">Financial Privileges</div>
                                <input
                                    name="finance_privilege"
                                    type="checkbox"
                                    value={this.state.updateOrgUserForm.finance_privilege.toString()}
                                    checked={this.state.updateOrgUserForm.finance_privilege}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="secondary-row">
                            <div className="OrgUserCard_Role l-margin-right" onClick={this.preventBubble}>
                                <div className="label">Role</div>
                                {
                                    roleOptions.map((roleOption, i) => (
                                        <label
                                            key={roleOption.value}
                                        >
                                            <input
                                                name="selectedRole"
                                                type="radio"
                                                value={roleOption.value}
                                                checked={this.state.updateOrgUserForm.selectedRole === roleOption.value}
                                                onChange={onChangeHandler}
                                            />
                                            <span className="xs-margin-left">{roleOption.label}: </span>
                                            <span className="role-desc">{roleOption.desc}</span>
                                        </label>

                                    ))
                                }
                            </div>
                            <div className="OrgUserCard_Cost l-margin-right">
                                <div className="label">Cost</div>
                                <div>$20/hr</div>
                            </div>
                            <div className="OrgUserCard_ResetPW">
                                <div className="label">Reset Password</div>
                                <button className="btn btn-sm btn-default" onClick={this.preventBubble}>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="id" value={this.state.updateOrgUserForm.id} />
                </form>
            );
        }
    }

    public render() {
        return this.editableRow();
    }
}

export { Card };
