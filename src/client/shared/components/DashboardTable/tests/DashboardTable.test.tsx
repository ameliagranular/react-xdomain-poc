import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {
    DashboardTable,
    IDashboardTableProps
} from '../DashboardTable';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props: IDashboardTableProps = {}) => (
    <DashboardTable {...props} />
);

const doMount = (props: IDashboardTableProps = {}) => {
    return mount(wrapper(props));
};

describe('DashboardTable', () => {
    it('renders expected markup with no props', () => {
        expect(toJson(doMount())).toMatchSnapshot();
    });

    it('renders expected markup with pending', () => {
        expect(toJson(doMount({
            pending: true
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending and counts', () => {
        expect(toJson(doMount({
            pending: true,
            rowCount: 2,
            colCount: 2
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title and no rows', () => {
        expect(toJson(doMount({
            title: <span>'Dashboard Table'</span>,
            emptyMessage: <span>No Data</span>,
            rows: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with no rows', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            rows: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with rows', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            rows: [
                <tr key={1}><td>Name 1</td><td>Val 1</td></tr>,
                <tr key={2}><td>Name 2</td><td>Val 2</td></tr>
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with rows, header row, and title', () => {
        expect(toJson(doMount({
            title: <span>'Dashboard Table'</span>,
            emptyMessage: <span>No Data</span>,
            headerRow: <tr><th>Col 1</th><th>Col 2</th></tr>,
            rows: [
                <tr key={1}><td>Name 1</td><td>Val 1</td></tr>,
                <tr key={2}><td>Name 2</td><td>Val 2</td></tr>
            ]
        }))).toMatchSnapshot();
    });
});
