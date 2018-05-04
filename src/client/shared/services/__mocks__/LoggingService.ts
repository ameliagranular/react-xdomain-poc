// tslint:disable no-console

export function log() {}

export function logDebug() {}

export function logInfo() {}

export function logWarn() {}

export function logError() {}

export function logTestOnly(...args: any[]) {
    console.log(...args);
}
