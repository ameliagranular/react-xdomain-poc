import {
    loadDemoCrops,
    addDemoCrop,
    replaceDemoCrop,
    removeDemoCrop,
    fetchDemoCrops,
    fetchDemoCrop,
    createDemoCrop,
    updateDemoCrop,
    destroyDemoCrop
} from '../DemoCropActions';

import { DemoCropMockData } from '../__mocks__/data/DemoCropMockData';

jest.mock('../DemoCropResource');

it('fetchDemoCrops dispatches loadDemoCrops with the expected data', () => {
    expect.assertions(1);
    const expectedData = DemoCropMockData;
    const dispatch = jest.fn();
    return fetchDemoCrops()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            loadDemoCrops(expectedData)
        );
    });
});

it('fetchDemoCrop dispatches replaceDemoCrop with the expected data', () => {
    expect.assertions(1);
    const expectedData = { id: 2, name: 'Soybean', amount: 200 };
    const dispatch = jest.fn();
    return fetchDemoCrop(expectedData.id)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            replaceDemoCrop(expectedData)
        );
    });
});

it('createDemoCrop dispatches addDemoCrop with the expected data', () => {
    expect.assertions(1);
    const expectedData = { id: 4, name: 'Wheat', amount: 900 };
    const dispatch = jest.fn();
    return createDemoCrop(expectedData)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            addDemoCrop(expectedData)
        );
    });
});

it('updateDemoCrop dispatches replaceDemoCrop with the expected data', () => {
    expect.assertions(1);
    const expectedData = { id: 2, name: 'Wheat', amount: 500 };
    const dispatch = jest.fn();
    return updateDemoCrop(expectedData)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            replaceDemoCrop(expectedData)
        );
    });
});

it('destroyDemoCrop dispatches removeDemoCrop with the expected data', () => {
    expect.assertions(1);
    const expectedData = 3;
    const dispatch = jest.fn();
    return destroyDemoCrop(expectedData)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
            removeDemoCrop(expectedData)
        );
    });
});
