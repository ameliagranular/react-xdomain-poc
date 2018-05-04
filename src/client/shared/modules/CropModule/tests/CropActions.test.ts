import {
    loadCrops,
    fetchCrops
} from '../CropActions';

import {
    CropMockData
} from 'shared/modules/CropModule/__mocks__/data/CropMockData';

jest.mock('../CropResource');
jest.mock('shared/services/AppDataService');
jest.mock('shared/services/LoggingService');

it('fetchCrops dispatches loadCrops with the expected data', () => {
    expect.assertions(1);
    const expectedData = CropMockData;
    const dispatch = jest.fn();
    return fetchCrops()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            loadCrops(expectedData)
        );
    });
});
