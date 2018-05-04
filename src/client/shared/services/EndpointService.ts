/**
 * A service for forming endpoints to be passed to AjaxService.
 */
interface IGetEndpointOptions {
    params?: {
        [index: string]: any;
    };
    mock?: boolean;
}

export function getEndpoint(endpoint: string, {
    params = {},
    mock = false
}: IGetEndpointOptions = {}) {
    let calculatedEndpoint = endpoint;
    if (mock) {
        calculatedEndpoint = `http://localhost:5050${calculatedEndpoint}`;
    }
    const sortedParamKeys = Object.keys(params).sort();
    let isFirstParam = true;
    for (const key of sortedParamKeys) {
        if (params.hasOwnProperty(key)) {
            const val = params[key];
            if (isFirstParam) {
                calculatedEndpoint = `${calculatedEndpoint}?${key}=${val}`;
            } else {
                calculatedEndpoint = `${calculatedEndpoint}&${key}=${val}`;
            }
            isFirstParam = false;
        }
    }
    return calculatedEndpoint;
}
