import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {
    DashboardCropPie,
    IDashboardCropPieProps
} from '../DashboardCropPie';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props: IDashboardCropPieProps = {}) => (
    <DashboardCropPie {...props} />
);

const doMount = (props: IDashboardCropPieProps = {}) => {
    return mount(wrapper(props));
};

describe('DashboardCropPie', () => {

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
            count: 5
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, emptyMessage, and dataset', () => {
        expect(toJson(doMount({
            title: <span>Title</span>,
            emptyMessage: <span>No Data Found</span>,
            dataset: [
                {
                    cropTypes: [{
                        cropTypeId: '1',
                        cropTypeElement: <span>Crop 1</span>,
                        cropTypeColor: '#CCCCCC'
                    }],
                    percentage: 50,
                    amount: <span>Crop Amount 1</span>
                },
                {
                    cropTypes: [{
                        cropTypeId: '2',
                        cropTypeElement: <span>Crop 2</span>,
                        cropTypeColor: '#CCCCCC'
                    }],
                    percentage: 75,
                    amount: <span>Crop Amount 2</span>
                }
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, emptyMessage, and empty dataset', () => {
        expect(toJson(doMount({
            title: <span>Title</span>,
            emptyMessage: <span>No Data Found</span>,
            dataset: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with emptyMessage and dataset', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data Found</span>,
            dataset: [
                {
                    cropTypes: [{
                        cropTypeId: '1',
                        cropTypeElement: <span>Crop 1</span>,
                        cropTypeColor: '#CCCCCC'
                    }],
                    percentage: 50,
                    amount: <span>Crop Amount 1</span>
                },
                {
                    cropTypes: [{
                        cropTypeId: '2',
                        cropTypeElement: <span>Crop 2</span>,
                        cropTypeColor: '#CCCCCC'
                    }],
                    percentage: 75,
                    amount: <span>Crop Amount 2</span>
                }
            ]
        }))).toMatchSnapshot();
    });
});
