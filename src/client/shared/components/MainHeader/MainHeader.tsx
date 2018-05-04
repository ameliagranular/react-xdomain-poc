/**
 * The main header of the application.
 */

import * as React from 'react';
import './MainHeader.scss';

import { MainNav } from './components/MainNav';

const MainHeader: React.StatelessComponent = () => (
    <div className="MainHeader">
        <MainNav/>
    </div>
);

export { MainHeader };
