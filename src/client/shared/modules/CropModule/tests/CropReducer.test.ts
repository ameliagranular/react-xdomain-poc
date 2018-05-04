import 'jest';  // necessary for types

import {
    CropReducer,
    IState
} from '../CropReducer';

import {
    loadCrops
} from '../CropActions';

import {
    CropMockData
} from 'shared/modules/CropModule/__mocks__/data/CropMockData';

jest.mock('shared/services/AppDataService');
jest.mock('shared/services/LoggingService');

it('returns a state object', () => {
    const result = CropReducer(undefined, {type: 'ANYTHING'});
    expect(result).toBeDefined();
});

it('loads data into initial state', () => {
    const expectedData = CropMockData;
    const expectedState: IState = {
        fetching: false,
        loaded: true,
        data: expectedData
    };
    const result = CropReducer(undefined, loadCrops(expectedData));
    expect(result).toMatchObject(expectedState);
});

it('loads data into existing state', () => {
    const startState: IState = {
        fetching: false,
        loaded: true,
        data: [
            {
                displayName: 'Some Crop - Product',
                cropTypeId: '0000',
                cropTypeDisplayName: 'Some Crop',
                cropTypeAbbr: 'SC',
                cropTypeColor: '#000000',
                cropProductId: '0000-0000',
                cropProductDisplayName: 'Something'
            }
        ]
    };

    const expectedData = CropMockData;

    const expectedState: IState = {
        fetching: false,
        loaded: true,
        data: expectedData
    };
    const result = CropReducer(startState, loadCrops(expectedData));
    expect(result).toMatchObject(expectedState);
});
