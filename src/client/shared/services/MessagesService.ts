/**
 * A service that handles the creation of i18n messages objects for React-Intl.
 */

import { LOCALE } from '../models/LocaleModel';
import { IIntlMessages } from '../models/IntlMessagesModel';

/**
 * Create an i18n messages object for use with React-Intl when rendering the page
 *
 * @param m - the messages from which you wish to create an i18n messages object
 *
 *            IMPORTANT: If you are not creating a messages object for anything other than a page,
 *                       you must include a namespace:
 *
 *                       createIntlMessages({ meta: { namespace: 'mynamespace' }, ... });
 *
 * @param addOns - any additional messages modules to import into this i18n messages object
 *
 *            IMPORTANT: This should only be used when creating a messages object for a page.
 *
 */
export function createIntlMessages(
    m: IIntlMessages = {},
    addOns: IIntlMessages[] = []
) {
    let messages: IIntlMessages = {};
    messages.meta = m.meta || {};

    messages[LOCALE.EN_US] = flattenMessages(m[LOCALE.EN_US] || {});
    messages[LOCALE.ES_ES] = flattenMessages(m[LOCALE.ES_ES] || m[LOCALE.EN_US] || {});
    messages[LOCALE.FR_FR] = flattenMessages(m[LOCALE.FR_FR] || m[LOCALE.EN_US] || {});

    addOns.forEach((addOn) => {
        const namespace = addOn.meta.namespace;
        if (typeof(namespace) !== 'string' || !namespace.length) {
            // skip this addOn if no namespace is given
            return;
        }
        messages[LOCALE.EN_US] = {
            ...flattenMessages(addOn[LOCALE.EN_US] || {}, namespace),
            ...messages[LOCALE.EN_US]
        };
        messages[LOCALE.ES_ES] = {
            ...flattenMessages(addOn[LOCALE.ES_ES] || addOn[LOCALE.EN_US] || {}, namespace),
            ...messages[LOCALE.ES_ES]
        };
        messages[LOCALE.FR_FR] = {
            ...flattenMessages(addOn[LOCALE.FR_FR] || addOn[LOCALE.EN_US] || {}, namespace),
            ...messages[LOCALE.FR_FR]
        };
    });

    messages = populateMissingIntlMessages(messages);

    return messages;
}

// populates any missing messages from other languages with the equivalent LOCALE.EN_US message
function populateMissingIntlMessages(m: IIntlMessages) {
    const messages = m;
    for (const key in messages[LOCALE.EN_US]) {
        if (messages[LOCALE.EN_US].hasOwnProperty(key)) {
            if (messages[LOCALE.ES_ES][key] === undefined) {
                messages[LOCALE.ES_ES][key] = messages[LOCALE.EN_US][key];
            }
            if (messages[LOCALE.FR_FR][key] === undefined) {
                messages[LOCALE.FR_FR][key] = messages[LOCALE.EN_US][key];
            }
        }
    }
    return messages;
}

function flattenMessages(nestedMessages: any, prefix = '') {
    /* from https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object */
    return Object.keys(nestedMessages).reduce((messages: any, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}
