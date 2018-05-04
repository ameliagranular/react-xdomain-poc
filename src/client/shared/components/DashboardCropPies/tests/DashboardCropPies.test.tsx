import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {
    DashboardCropPies,
    IDashboardCropPiesProps
} from '../DashboardCropPies';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props: IDashboardCropPiesProps = {}) => (
    <DashboardCropPies {...props} />
);

const doMount = (props: IDashboardCropPiesProps = {}) => {
    return mount(wrapper(props));
};

describe('DashboardCropPies', () => {

    it('renders expected markup with no props', () => {
        expect(toJson(doMount())).toMatchSnapshot();
    });

    it('renders expected markup with pending', () => {
        expect(toJson(doMount({
            pending: true
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending and pieCount', () => {
        expect(toJson(doMount({
            pending: true,
            pieCount: 5
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending, pieCount, and tabCount', () => {
        expect(toJson(doMount({
            pending: true,
            pieCount: 5,
            tabCount: 3
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending, pieCount, title, description, and link', () => {
        expect(toJson(doMount({
            pending: true,
            pieCount: 5,
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>
        }))).toMatchSnapshot();
    });

    it('renders expected markup with pending, pieCount, tabCount, title, description, and link', () => {
        expect(toJson(doMount({
            pending: true,
            pieCount: 5,
            tabCount: 2,
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>
        }))).toMatchSnapshot();
    });

    it('renders expected markup with emptyMessage and dataset', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            dataset: [
                {
                    crop: {
                        cropTypeId: '1',
                        cropTypeElement: <span>Crop 1</span>,
                        cropTypeColor: '#CCCCCC',
                        cropProductId: '1',
                        cropProductElement: <span>Crop Product 1</span>
                    },
                    color: '#CCCCCC',
                    percentage: 50,
                    amount: <span>Crop Amount 1</span>
                },
                {
                    crop: {
                        cropTypeId: '2',
                        cropTypeElement: <span>Crop 2</span>,
                        cropTypeColor: '#CCCCCC',
                        cropProductId: '2',
                        cropProductElement: <span>Crop Product 2</span>
                    },
                    color: '#CCCCCC',
                    percentage: 75,
                    amount: <span>Crop Amount 2</span>
                }
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, description, link, and dataset', () => {
        expect(toJson(doMount({
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>,
            emptyMessage: <span>No Data</span>,
            dataset: [
                {
                    crop: {
                        cropTypeId: '1',
                        cropTypeElement: <span>Crop 1</span>,
                        cropTypeColor: '#CCCCCC',
                        cropProductId: '1',
                        cropProductElement: <span>Crop Product 1</span>
                    },
                    color: '#CCCCCC',
                    percentage: 50,
                    amount: <span>Crop Amount 1</span>
                },
                {
                    crop: {
                        cropTypeId: '2',
                        cropTypeElement: <span>Crop 2</span>,
                        cropTypeColor: '#CCCCCC',
                        cropProductId: '2',
                        cropProductElement: <span>Crop Product 2</span>
                    },
                    color: '#CCCCCC',
                    percentage: 75,
                    amount: <span>Crop Amount 2</span>
                }
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, description, link, and empty dataset', () => {
    expect(toJson(doMount({
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>,
            emptyMessage: <span>No Data</span>,
            dataset: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with datasets', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            datasets: [
                {
                    tab: <span>Tab 1</span>,
                    onTabClick: () => {},
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '1',
                                cropTypeElement: <span>Crop 1</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '1',
                                cropProductElement: <span>Crop Product 1</span>
                            },
                            color: '#CCCCCC',
                            percentage: 50,
                            amount: <span>Crop Amount 1</span>
                        },
                        {
                            crop: {
                                cropTypeId: '2',
                                cropTypeElement: <span>Crop 2</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 75,
                            amount: <span>Crop Amount 2</span>
                        }
                    ]
                },
                {
                    tab: <span>Tab 2</span>,
                    onTabClick: () => {},
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '3',
                                cropTypeElement: <span>Crop 3</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 30,
                            amount: <span>Crop Amount 3</span>
                        },
                        {
                            crop: {
                                cropTypeId: '4',
                                cropTypeElement: <span>Crop 4</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '4',
                                cropProductElement: <span>Crop Product 4</span>
                            },
                            color: '#CCCCCC',
                            percentage: 60,
                            amount: <span>Crop Amount 4</span>
                        }
                    ]
                }
            ]
        }))).toMatchSnapshot();
    });

    it('renders expected markup with empty datasets', () => {
        expect(toJson(doMount({
            emptyMessage: <span>No Data</span>,
            datasets: []
        }))).toMatchSnapshot();
    });

    it('renders expected markup with title, description, link, selectedTabIdx, and datasets', () => {
        expect(toJson(doMount({
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>,
            selectedTabIdx: 1,
            emptyMessage: <span>No Data</span>,
            datasets: [
                {
                    tab: <span>Tab 1</span>,
                    onTabClick: () => {},
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '1',
                                cropTypeElement: <span>Crop 1</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '1',
                                cropProductElement: <span>Crop Product 1</span>
                            },
                            color: '#CCCCCC',
                            percentage: 50,
                            amount: <span>Crop Amount 1</span>
                        },
                        {
                            crop: {
                                cropTypeId: '2',
                                cropTypeElement: <span>Crop 2</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 75,
                            amount: <span>Crop Amount 2</span>
                        }
                    ]
                },
                {
                    tab: <span>Tab 2</span>,
                    onTabClick: () => {},
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '3',
                                cropTypeElement: <span>Crop 3</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 30,
                            amount: <span>Crop Amount 3</span>
                        },
                        {
                            crop: {
                                cropTypeId: '4',
                                cropTypeElement: <span>Crop 4</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '4',
                                cropProductElement: <span>Crop Product 4</span>
                            },
                            color: '#CCCCCC',
                            percentage: 60,
                            amount: <span>Crop Amount 4</span>
                        }
                    ]
                }
            ]
        }))).toMatchSnapshot();
    });

    it('clicking a tab should call corresponding onTabClick()', () => {

        const onTabClick0 = jest.fn();
        const onTabClick1 = jest.fn();

        const component = doMount({
            title: <span>Title</span>,
            description: <span>Description</span>,
            link: <span>Link</span>,
            selectedTabIdx: 1,
            emptyMessage: <span>No Data</span>,
            datasets: [
                {
                    tab: <span>Tab 1</span>,
                    onTabClick: onTabClick0,
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '1',
                                cropTypeElement: <span>Crop 1</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '1',
                                cropProductElement: <span>Crop Product 1</span>
                            },
                            color: '#CCCCCC',
                            percentage: 50,
                            amount: <span>Crop Amount 1</span>
                        },
                        {
                            crop: {
                                cropTypeId: '2',
                                cropTypeElement: <span>Crop 2</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 75,
                            amount: <span>Crop Amount 2</span>
                        }
                    ]
                },
                {
                    tab: <span>Tab 2</span>,
                    onTabClick: onTabClick1,
                    dataset: [
                        {
                            crop: {
                                cropTypeId: '3',
                                cropTypeElement: <span>Crop 3</span>,
                                cropTypeColor: '#CCCCCC'
                            },
                            color: '#CCCCCC',
                            percentage: 30,
                            amount: <span>Crop Amount 3</span>
                        },
                        {
                            crop: {
                                cropTypeId: '4',
                                cropTypeElement: <span>Crop 4</span>,
                                cropTypeColor: '#CCCCCC',
                                cropProductId: '4',
                                cropProductElement: <span>Crop Product 4</span>
                            },
                            color: '#CCCCCC',
                            percentage: 60,
                            amount: <span>Crop Amount 4</span>
                        }
                    ]
                }
            ]
        });

        component.find('.DashboardCropPies_Tabs .btn-group').childAt(0).simulate('click');
        component.find('.DashboardCropPies_Tabs .btn-group').childAt(1).simulate('click');

        expect(onTabClick0).toHaveBeenCalledTimes(1);
        expect(onTabClick1).toHaveBeenCalledTimes(1);
    });
});
