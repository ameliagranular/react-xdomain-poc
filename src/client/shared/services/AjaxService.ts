/**
 * A service that handles ajax calls with axios. Also provides optional front-end caching.
 */

import axios, {
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';

import {
    createInstance as localforageCreateInstance
} from 'localforage';

import { logDebug } from './LoggingService';
import { getActiveProductionCycleId } from './AppDataService';


const DEFAULT_CACHE_REFRESH_DELAY = 2000; // 2 seconds
const DEFAULT_CACHE_LIFETIME = 1000 * 60 * 60 * 48; // 48 hours


const store = localforageCreateInstance({
    name: 'alpine_ajax',
    storeName: 'alpine_ajax_store'
});

let lastClearOfExpiredCache = 0;


export type IAjaxServiceRequest = AxiosRequestConfig;
export type IAjaxServiceResponse = AxiosResponse;
export type IAjaxServiceMockForTestingCallback = (request: IAjaxServiceRequest) => void;

export interface IAjaxServiceCallOptions {
    useCache?: boolean;
    cacheRefreshDelay?: number;
    cacheLifetime?: number;

    mockForTesting?: boolean;
    mockForTestingCallback?: IAjaxServiceMockForTestingCallback;
    mockForTestingResponse?: IAjaxServiceResponse;
}

export function ajaxCall(
    request: IAjaxServiceRequest,
    {
        useCache = false,
        cacheRefreshDelay = DEFAULT_CACHE_REFRESH_DELAY,
        cacheLifetime = DEFAULT_CACHE_LIFETIME,

        mockForTesting = false,
        mockForTestingCallback = null,
        mockForTestingResponse = null
    }: IAjaxServiceCallOptions = {}
): Promise<IAjaxServiceResponse> {
    /*

    DESCRIPTION
        if @useCache (using the ajax cache):
            Provides the cached response if available and not expired,
            otherwise will fire off a fresh request, cache the response, and provide that response.

            In the case that a cached response is returned, a request is made for fresh data
            after @cacheRefreshDelay seconds and that response is cached.

        else:
            Simply calls axios

    OPTIONS
        @useCache = whether to use the cache in our request
        @cacheRefreshDelay = if using the cache, how long to wait before hitting the
            endpoint for a fresh response to cache
        @cacheLifetime = if using the cache, how long will the response
            of this request stay cached

        @mockForTesting = set to true when involved in the unit test of other modules
        @mockForTestingCallback = if mocking for testing, a callback that passes back
            the request, for further testing
        @mockForTestingResponse = if mocking for testing, the response to be returned

    USAGE
        Use this in place of axios

    */

    return new Promise((resolve, reject) => {
        let cacheKey: string;

        // sanity checks
        if (request.params) {
            throw new Error(
                '[AjaxService] Do not pass params. Use getEndpoint from EndpointService instead.'
            );
        }

        // allow for mocking
        if (mockForTesting) {
            if (mockForTestingCallback) { mockForTestingCallback(request); }
            return resolve(mockForTestingResponse);
        }

        // handle ajax call
        if (useCache) {
            clearExpired().then(() => {

                if (!request || !request.url) {
                    return reject(new Error(`[AjaxService] invalid request`));
                }

                try { cacheKey = getKey(request); } catch (e) { return reject(e); }

                if (!cacheKey) {
                    return reject(new Error('[AjaxService] could not determine a cache key from this request'));
                }

                store.getItem(`RESPONSE:${cacheKey}`).then((cache: string) => {

                    if (cache !== null) {

                        // if we have cache, refresh it for the next time

                        logDebug(`[AjaxService] using cache for ${cacheKey}`);
                        store.setItem(`EXPIRES:${cacheKey}`, Date.now()); // invalidate the cache key in the meantime
                        setTimeout(() => { refresh(cacheKey, request, cacheLifetime); }, cacheRefreshDelay);
                        return resolve(JSON.parse(cache));
                    } else {

                        // otherwise hit the endpoint now

                        logDebug(`[AjaxService] no cache found for ${cacheKey}. hitting the endpoint...`);
                        refresh(cacheKey, request, cacheLifetime).then((freshResponse) => {
                            return resolve(freshResponse);
                        }).catch(reject);
                    }

                }).catch(reject);
            });

        } else {
            return resolve(axios(request));
        }
    });
}


export interface IAjaxServiceClearCacheOptions {
    doRefresh?: boolean;
    cacheRefreshDelay?: number;
    cacheLifetime?: number;
}

export function ajaxClearCache(
    request: IAjaxServiceRequest,
    {
        doRefresh = true,
        cacheRefreshDelay = 0,
        cacheLifetime = DEFAULT_CACHE_LIFETIME
    }: IAjaxServiceClearCacheOptions = {}
): Promise<void> {
    /*

    DESCRIPTION
        Clears the cache of any matching requests (ignoring params)

    OPTIONS
        @doRefresh = whether to refresh the request after clearing its response in the cache
        @cacheRefreshDelay = if using the cache, how long to wait before hitting the
            endpoint for a fresh response to cache
        @cacheLifetime = if using the cache, how long will the response
            of this request stay cached

    USAGE
        Use this when you know that the cached response of the request has become incorrect.

    */

    return new Promise((resolve, reject) => {
        let cacheKey: string;

        try { cacheKey = getKey(request); } catch (e) { return reject(e); }

        if (!cacheKey) {
            return reject(new Error('[AjaxService] could not determine a cache key from this request'));
        }

        const promises: Array<Promise<any>> = [];
        const toRemove: string[] = [];

        store.iterate((val, key) => {
            if (keysMatch(key, cacheKey)) {
                toRemove.push(key);
            }
        }).then(() => {
            toRemove.forEach((key) => {
                logDebug(`[AjaxService] clearing cache for ${key}`);
                promises.push(store.removeItem(key));
            });

            return Promise.all(promises).then(() => {

                if (doRefresh) {
                    setTimeout(() => { refresh(cacheKey, request, cacheLifetime); }, cacheRefreshDelay);
                }

                return resolve();
            }, reject);
        }).catch(reject);
    });
}


export function ajaxGetCacheCreatedTimestamp(
    request: IAjaxServiceRequest
): Promise<number> {
    /*

    DESCRIPTION
        Provides the timestamp of the cache creation
        or the current time if no cache exists for the request

    */

    return new Promise((resolve, reject) => {
        let cacheKey: string;

        if (!request || !request.url) {
            return reject(new Error(`[AjaxService] invalid request`));
        }

        try { cacheKey = getKey(request); } catch (e) { return reject(e); }

        if (!cacheKey) {
            return reject(new Error('[AjaxService] could not determine a cache key from this request'));
        }

        clearExpired().then(() => {

            store.getItem(`CREATED:${cacheKey}`).then((creationTimestamp: number) => {
                if (creationTimestamp === null) {
                    return resolve(Date.now());
                }
                return resolve(creationTimestamp);
            }).catch(reject);

        }).catch(reject);
    });
}


function save(
    cacheKey: string,
    request: IAjaxServiceRequest,
    response: IAjaxServiceResponse,
    cacheLifetime: number
): Promise<void> {
    return new Promise((resolve, reject) => {
        const promises: Array<Promise<any>> = [];
        promises.push(store.setItem(`RESPONSE:${cacheKey}`, JSON.stringify(response)));
        promises.push(store.setItem(`CREATED:${cacheKey}`, Date.now()));
        promises.push(store.setItem(`EXPIRES:${cacheKey}`, Date.now() + cacheLifetime));
        return Promise.all(promises).then(() => resolve(), reject);
    });
}

function refresh(
    cacheKey: string,
    request: IAjaxServiceRequest,
    cacheLifetime: number
): Promise<IAjaxServiceResponse> {
    return new Promise((resolve, reject) => {
        const reqPromise = axios(request);
        reqPromise.then((freshResponse) => {
            save(cacheKey, request, freshResponse, cacheLifetime).then(() => {
                logDebug(`[AjaxService] refreshed cache for ${cacheKey}`);

                // set timeout to refresh cache after expiration
                setTimeout(() => {
                    refresh(cacheKey, request, cacheLifetime);
                }, cacheLifetime);

                return resolve(freshResponse);
            }).catch(reject);
        }, reject);
    });
}

function getKey(request: IAjaxServiceRequest): string {
    if (!request.url) { throw new Error(`[AjaxService] could not retrieve the url from request`); }

    const isAjax = request.url.indexOf('/api') !== 0;
    let cacheKey = isAjax && !request.url.startsWith('/ajax') ? '/ajax' + request.url : request.url;
    if (isAjax) {
        cacheKey += request.url.includes('?')
            ? `&__productionCycle__=${getActiveProductionCycleId()}`
            : `?__productionCycle__=${getActiveProductionCycleId()}`;
    }

    return cacheKey;
}

function clearExpired(): Promise<void> {
    return new Promise((resolve, reject) => {
        const now = Date.now();

        // throttle for 1 second
        if (now - lastClearOfExpiredCache <= 1000) {
            logDebug(`[AjaxService] throttling clearing expired ajax cache`);
            return resolve();
        }
        logDebug(`[AjaxService] clearing expired ajax cache`);
        lastClearOfExpiredCache = now;

        const promises: Array<Promise<any>> = [];
        const toRemove: string[] = [];

        store.iterate((expirationTime, key) => {
            if (key.match(/^EXPIRES:/) && now > expirationTime) {
                toRemove.push(key);
                toRemove.push(key.replace(/^EXPIRES/, 'CREATED'));
                toRemove.push(key.replace(/^EXPIRES/, 'RESPONSE'));
            }
        }).then(() => {
            toRemove.forEach((key) => {
                promises.push(store.removeItem(key));
            });

            return Promise.all(promises).then(() => resolve(), reject);
        }).catch(reject);
    });
}

function keysMatch(keyA: string, keyB: string): boolean {
    return cleanKey(keyA) === cleanKey(keyB);
}

function cleanKey(key: string): string {
    /*
        Returns key, stripped of its params and store prefix, for the keysMatch method
    */
    let keyBuffer = key;
    if (key.match(/^RESPONSE:/)) {
        keyBuffer = key.slice('RESPONSE:'.length);
    } else if (key.match(/^EXPIRES:/)) {
        keyBuffer = key.slice('EXPIRES:'.length);
    } else if (key.match(/^CREATED:/)) {
        keyBuffer = key.slice('CREATED:'.length);
    }

    const keyParamSplitPoint = keyBuffer.indexOf('?');
    keyBuffer = keyParamSplitPoint !== -1
        ? keyBuffer.slice(0, keyParamSplitPoint)
        : keyBuffer;

    return keyBuffer;
}
