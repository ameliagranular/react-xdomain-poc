import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {
    DashboardStackedBars,
    IDashboardStackedBarsProps
} from '../DashboardStackedBars';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props: IDashboardStackedBarsProps = {}) => (
    <DashboardStackedBars {...props} />
);

const doMount = (props: IDashboardStackedBarsProps = {}) => {
    return mount(wrapper(props));
};

describe('DashboardStackedBars', () => {
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
            emptyMessage: <span>No Data</span>,
            dataset: [
                {
                    key: '1',
                    name: <span>Entry Name 1</span>,
                    color: '#CCCCCC',
                    percentage: 50,
                    amount: <span>Entry Amount 1</span>
                },
                {
                    key: '2',
                    name: <span>Entry Name 2</span>,
                    color: '#CCCCCC',
                    percentage: 75,
                    amount: <span>Entry Amount 2</span>
                },
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, description, link, and data', () => {
        expect(toJson(doMount({
            title: <span>Dashboard Stacked Bars</span>,
            description: <span>A set of bar charts about something</span>,
            link: <span>Link</span>,
            emptyMessage: <span>No Data</span>,
            dataset: [
                {
                    key: '1',
                    name: <span>Entry Name 1</span>,
                    color: '#CCCCCC',
                    percentage: 50,
                    amount: <span>Entry Amount 1</span>
                },
                {
                    key: '2',
                    name: <span>Entry Name 2</span>,
                    color: '#CCCCCC',
                    percentage: 75,
                    amount: <span>Entry Amount 2</span>
                },
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with empty data', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            dataset: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, description, link, and empty data', () => {
        expect(toJson(doMount({
            title: <span>Dashboard Stacked Bars</span>,
            description: <span>A set of bar charts about something</span>,
            link: <span>Link</span>,
            emptyMessage: <span>No Data</span>,
            dataset: []
        }))).toMatchSnapshot();
    });
});
