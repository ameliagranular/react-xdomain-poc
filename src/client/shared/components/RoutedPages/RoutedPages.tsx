import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './RoutedPages.scss';

export interface IRoutedPagesProps {
    routes: IRoute[];
}

export interface IRoute {
    compFunc?: () => JSX.Element;
    component?: React.ComponentClass;
    path: string;
}

export const RoutedPages: React.StatelessComponent<IRoutedPagesProps>
    = (props) => {
        return (
            <Switch>
                {
                    props.routes && props.routes.map((route, i) => (
                        route.compFunc ?
                            <Route key={route.path} path={route.path} render={route.compFunc} /> :
                            <Route key={route.path} path={route.path} component={route.component} />
                    ))
                }
            </Switch>
        );
    };
