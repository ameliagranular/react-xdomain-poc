import * as React from 'react';
import { connect } from 'react-redux';

import { HashRouter as Router } from 'react-router-dom';
import { INavTab, NavTabs } from '../shared/components/NavTabs';
import { IRoute, RoutedPages } from '../shared/components/RoutedPages';

import { IState } from './SetupOrgUsersPageStore';

import { IState as IOrgUsersReducerState } from './modules/OrgUsersReducer';

import { Admins } from './components/Admins';
import { Managers } from './components/Managers';
import { Operators } from './components/Operators';

import { fetchOrgUsers, IFetchOrgUsersAction } from './modules/OrgUsersActions';

import './SetupOrgUsersPage.scss';

export interface IProps {
    fetchOrgUsers: IFetchOrgUsersAction;
    orgUsers: IOrgUsersReducerState;
}

let OperatorsPage: () => JSX.Element;
let AdminsPage: () => JSX.Element;
let ManagersPage: () => JSX.Element;

const userMap: any = {
    User: [],
    Manager: [],
    Administrator: []
};

class SetupOrgUsersPage extends React.Component<IProps> {

    public componentWillMount () {
        this.props.fetchOrgUsers();
    }

    public render() {
        if (this.props.orgUsers.loaded) {
            this.sortAndBucketUsers();

            OperatorsPage = () => {
                return (
                    <Operators
                        orgUsers={userMap.User}
                    />
                );
            };

            AdminsPage = () => {
                return (
                    <Admins
                        orgUsers={userMap.Administrator}
                    />
                );
            };

            ManagersPage = () => {
                return (
                    <Managers
                        orgUsers={userMap.Manager}
                    />
                );
            };
        }

        const SetupOrgUsersNavTabs: INavTab[] = [
                {
                    label: 'Operators',
                    area: 'operator',
                    loc: '/operators'
                },
                {
                    label: 'Administrators',
                    area: 'admin',
                    loc: '/admins'
                },
                {
                    label: 'Managers',
                    area: 'mgr',
                    loc: '/managers'
                }
            ];

        const SetupOrgUsersRoutes: IRoute[] = [
            {
                path: '/operators',
                compFunc: OperatorsPage
            },
            {
                path: '/admins',
                compFunc: AdminsPage
            },
            {
                path: '/managers',
                compFunc: ManagersPage
            }
        ];

        return (
            <Router>
                <div className="SetupOrgUsersPage">
                    <div className="SetupOrgUsersPage_Header">
                        <h1>People</h1>
                        <div className="SetupOrgUsersPage_Subheader">
                            <NavTabs
                                tabs={SetupOrgUsersNavTabs}
                                className={'SetupOrgUsersPage_Tabs'}
                            />
                            <div className="SetupOrgUsersPage_ActionContainer">
                                <button
                                    className="btn btn-primary"
                                >
                                    Add Person
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="SetupOrgUsersPage_Body">
                        <RoutedPages
                            routes={SetupOrgUsersRoutes}
                        />
                    </div>
                </div>
            </Router>
        );
    }

    private sortAndBucketUsers() {
        this.props.orgUsers.data.organization_users.sort((a, b) => {
            if (a.user.first_name > b.user.first_name) {
                return 1;
            }

            if (a.user.first_name < b.user.first_name) {
                return -1;
            }

            return 0;
        });

        for (const user of this.props.orgUsers.data.organization_users) {
            if (user.is_active) {
                const role = user.role.name;
                if (!userMap[role]) {
                    userMap[role] = [];
                }

                userMap[role].push(user);
            }
        }
    }
}

const mapStateToProps = (state: IState) => ({orgUsers: state.orgUsers});

const mapDispatchToProps = {
    fetchOrgUsers
};

const ConnectedSetupOrgUsersPage = connect(mapStateToProps, mapDispatchToProps)(SetupOrgUsersPage);

export {
    ConnectedSetupOrgUsersPage as SetupOrgUsersPage
};
