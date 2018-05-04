// tslint:disable no-console

/**
 * A service that handles logging.
 */

export function logDebug(...args: any[]) {
    /* dev-block:start */
    console.debug(...args);
    /* dev-block:end */
}

export function logInfo(...args: any[]) {
    /* dev-block:start */
    console.info(...args);
    /* dev-block:end */
}

export function logWarn(...args: any[]) {
    /* dev-block:start */
    console.warn(...args);
    /* dev-block:end */
}

export function logError(...args: any[]) {
    /* dev-block:start */
    console.error(...args);
    /* dev-block:end */
}

export function logTestOnly(...args: any[]) {
    // performs a log in __mocks__/LogginService
}
