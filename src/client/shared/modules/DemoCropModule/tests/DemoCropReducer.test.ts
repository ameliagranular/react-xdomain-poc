import 'jest';  // necessary for types

import {
    DemoCropReducer,
    IState
} from '../DemoCropReducer';

import {
    addDemoCrop,
    replaceDemoCrop,
    loadDemoCrops,
    removeDemoCrop
} from '../DemoCropActions';

import { DemoCropMockData } from '../__mocks__/data/DemoCropMockData';


it('returns a state object', () => {
    const result = DemoCropReducer(undefined, {type: 'ANYTHING'});
    expect(result).toBeDefined();
});

it('loads crops into initial state', () => {
    const expectedState: IState = {
        loaded: true,
        data: DemoCropMockData
    };

    const crops = DemoCropMockData;
    const result = DemoCropReducer(undefined, loadDemoCrops(crops));
    expect(result).toMatchObject(expectedState);
});

it('loads crops', () => {
    const startState: IState = {
        loaded: true,
        data: [
            {id: 0, name: 'xxx', amount: 0}
        ]
    };

    const expectedState: IState = {
        loaded: true,
        data: DemoCropMockData
    };

    const crops = DemoCropMockData;
    const result = DemoCropReducer(startState, loadDemoCrops(crops));
    expect(result).toMatchObject(expectedState);
});

it('adds a crop', () => {
    const startState: IState = {
        loaded: true,
        data: DemoCropMockData.slice(0, DemoCropMockData.length - 1)
    };

    const expectedState: IState = {
        loaded: true,
        data: DemoCropMockData
    };

    const crop = DemoCropMockData[DemoCropMockData.length - 1];
    const result = DemoCropReducer(startState, addDemoCrop(crop));
    expect(result).toMatchObject(expectedState);
});

it('replaces a crop', () => {
    const startState: IState = {
        loaded: true,
        data: DemoCropMockData
    };

    const crop = { id: 2, name: 'Grapes', amount: 250 };
    const expectedState: IState = {
        loaded: true,
        data: DemoCropMockData.map(x => x.id === 2 ? crop : x)
    };

    const result = DemoCropReducer(startState, replaceDemoCrop(crop));
    expect(result).toMatchObject(expectedState);
});

it('removes a crop', () => {
    const startState: IState = {
        loaded: true,
        data: DemoCropMockData
    };

    const expectedState: IState = {
        loaded: true,
        data: DemoCropMockData.filter(x => x.id !== 1)
    };

    const result = DemoCropReducer(startState, removeDemoCrop(1));
    expect(result).toMatchObject(expectedState);
});
