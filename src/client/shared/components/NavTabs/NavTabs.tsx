import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './NavTabs.scss';

export interface INavTabsProps {
    tabs: INavTab[];
    className: string;
}

export interface INavTab {
    label: string;
    area: string;
    loc: string;
}

export const NavTabs: React.StatelessComponent<INavTabsProps>
    = (props) => {
        return (
            <div className="NavTabs">
                {
                    props.tabs && props.tabs.map((tab, i) => (
                        <NavLink activeClassName="selected" key={tab.area} to={tab.loc}>{tab.label}</NavLink>
                    ))
                }
            </div>
        );
    };
