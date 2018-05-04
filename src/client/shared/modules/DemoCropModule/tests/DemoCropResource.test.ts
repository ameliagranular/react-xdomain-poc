import 'jest';  // necessary for types

import {
    checkAjaxRequestMatches
} from 'shared/services/TestingService';

import {
    DemoCropResource
} from '../DemoCropResource';
import {
    IDemoCrop,
    INewDemoCrop
} from '../DemoCropModel';

import { DemoCropMockData } from '../__mocks__/data/DemoCropMockData';


it('all() returns the expected data', () => {
    expect.assertions(4);

    const expectedData: IDemoCrop[] = DemoCropMockData;

    const expectedRequest = {
        url: '/api/dummy/v1/crops'
    };
    const expectedResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedData
    };

    return DemoCropResource.all({
        mockForTesting: true,
        mockForTestingResponse: expectedResponse,
        mockForTestingCallback: (request) => {
            checkAjaxRequestMatches(request, expectedRequest);
        }
    }).then((data) => {
        // test that data matches exactly
        expect(data).toMatchObject(expectedData);
        expect(expectedData).toMatchObject(data);
    });
});

it('one() returns the expected data', () => {
    expect.assertions(4);

    const expectedData: IDemoCrop = DemoCropMockData.filter(x => x.id === 2)[0];

    const expectedRequest = {
        url: '/api/dummy/v1/crops/2'
    };
    const expectedResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedData
    };

    return DemoCropResource.one(expectedData.id, {
        mockForTesting: true,
        mockForTestingResponse: expectedResponse,
        mockForTestingCallback: (request) => {
            checkAjaxRequestMatches(request, expectedRequest);
        }
    }).then((data) => {
        // test that data matches exactly
        expect(data).toMatchObject(expectedData);
        expect(expectedData).toMatchObject(data);
    });
});

it('create() returns the expected data', () => {
    expect.assertions(4);

    const newData: INewDemoCrop = {
        name: 'Cherries', amount: 250
    };

    const expectedData: IDemoCrop = {
        id: 4, name: 'Cherries', amount: 250
    };

    const expectedRequest = {
        method: 'POST',
        url: '/api/dummy/v1/crops'
    };
    const expectedResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedData
    };

    return DemoCropResource.create(newData, {
        mockForTesting: true,
        mockForTestingResponse: expectedResponse,
        mockForTestingCallback: (request) => {
            checkAjaxRequestMatches(request, expectedRequest);
        }
    }).then((data) => {
        // test that data matches exactly
        expect(data).toMatchObject(expectedData);
        expect(expectedData).toMatchObject(data);
    });
});

it('put() returns the expected data', () => {
    expect.assertions(4);

    const expectedData: IDemoCrop = {
        id: 2, name: 'Watermelons', amount: 100
    };

    const expectedRequest = {
        method: 'PUT',
        url: '/api/dummy/v1/crops/2'
    };
    const expectedResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: expectedData
    };

    return DemoCropResource.update(expectedData, {
        mockForTesting: true,
        mockForTestingResponse: expectedResponse,
        mockForTestingCallback: (request) => {
            checkAjaxRequestMatches(request, expectedRequest);
        }
    }).then((data) => {
        // test that data matches exactly
        expect(data).toMatchObject(expectedData);
        expect(expectedData).toMatchObject(data);
    });
});

it('delete() returns the expected data', () => {
    expect.assertions(3);

    const expectedRequest = {
        method: 'DELETE',
        url: '/api/dummy/v1/crops/2'
    };
    const expectedResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {}
    };

    expect(DemoCropResource.destroy(2, {
        mockForTesting: true,
        mockForTestingResponse: expectedResponse,
        mockForTestingCallback: (request) => {
            checkAjaxRequestMatches(request, expectedRequest);
        }
    }).then((data) => {
        expect(data).toBeUndefined();
    }));
});
