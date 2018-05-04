import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {
    DashboardStatBoxes,
    IDashboardStatBoxesProps
} from '../DashboardStatBoxes';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props: IDashboardStatBoxesProps = {}) => (
    <DashboardStatBoxes {...props} />
);

const doMount = (props: IDashboardStatBoxesProps = {}) => {
    return mount(wrapper(props));
};

describe('DashboardStatBoxes', () => {
    it('renders expected markup with no props', () => {
        expect(toJson(doMount())).toMatchSnapshot();
    });

    it('renders expected markup with pending', () => {
        expect(toJson(doMount({
            pending: true
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending and count', () => {
        expect(toJson(doMount({
            pending: true,
            count: 2
        }))).toMatchSnapshot();
    });

    it('renders expected markup with data', () => {
        expect(toJson(doMount({
            elements: [
                { val: <span>$1,000</span>, label: <span>Amount Lost</span> },
                { val: <span>$4,000</span>, label: <span>Amount Gained</span> }
            ]
        }))).toMatchSnapshot();
    });
});
