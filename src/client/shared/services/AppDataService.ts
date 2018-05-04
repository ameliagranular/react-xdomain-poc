/**
 * A service that provides access to the data passed server-side when the template is rendered.
 */

declare const __appData: {
    [index: string]: any;
};

export function getAppData() {
    return __appData; // __appData is injected server-side
}

export function getActiveProductionCycleId(): string {

    if (!__appData || !__appData.user_id) {
        throw new Error('[AppDataService] getActiveProductionCycleId(): Could not find user_id in appData');
    }

    const key = `${__appData.user_id}__current-production-cycle-id_`;

    return sessionStorage.getItem(key) || localStorage.getItem(key);
}

export function getActiveProductionCycleYear(): string {
    // TODO  Implement me =(

    return '20XX';
}

export function getActiveUserFirstName(): string {
    // TODO  Implement me =(

    return 'User';
}
