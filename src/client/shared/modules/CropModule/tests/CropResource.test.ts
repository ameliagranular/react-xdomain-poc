import 'jest';  // necessary for types

import {
    checkAjaxRequestMatches
} from 'shared/services/TestingService';

import {
    CropResource
} from '../CropResource';

import {
    CropTypesMockDataRemote,
    CropProductaMockDataRemote
} from 'shared/modules/CropModule/__mocks__/data/CropMockDataRemote';

import {
    CropMockData
} from 'shared/modules/CropModule/__mocks__/data/CropMockData';

jest.mock('shared/services/AppDataService');
jest.mock('shared/services/LoggingService');

it('get() returns the expected data', () => {
    expect.assertions(6);

    const expectedCropTypesDataRemote = CropTypesMockDataRemote;
    const expectedCropProductsDataRemote = CropProductaMockDataRemote;

    const expectedCropTypesRequest = {
        url: `/api/crops/v1/cropTypes`
    };
    const expectedCropTypesResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedCropTypesDataRemote
    };

    const expectedCropProductsRequest = {
        url: `/api/crops/v1/cropProducts?activeOnly=true`
    };
    const expectedCropProductsResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedCropProductsDataRemote
    };

    return CropResource.all(
        {
            mockForTesting: true,
            mockForTestingResponse: expectedCropProductsResponse,
            mockForTestingCallback: (request) => {
                checkAjaxRequestMatches(request, expectedCropProductsRequest);
            }
        },
        {
            mockForTesting: true,
            mockForTestingResponse: expectedCropTypesResponse,
            mockForTestingCallback: (request) => {
                checkAjaxRequestMatches(request, expectedCropTypesRequest);
            }
        }
    ).then((data) => {
        // test that data matches exactly
        expect(data).toMatchObject(CropMockData);
        expect(CropMockData).toMatchObject(data);
    });
});
