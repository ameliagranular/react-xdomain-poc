import 'jest'; // necessary for types

import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { MainFooter } from '../MainFooter';

// Configure Enzyme for use with Jest & ES6+
configure({ adapter: new Adapter() });


const wrapper = (props = {}) => (
    <MainFooter {...props} />
);

const doMount = (props = {}) => {
    return mount(wrapper(props));
};

describe('MainFooter', () => {
    it('renders expected markup', () => {
        expect(toJson(doMount())).toMatchSnapshot();
    });
});
