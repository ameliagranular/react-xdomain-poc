/**
 * A shared i18n messages object for units.
 *
 * Use this on a page by adding UnitsMessages to the second parameter
 * of createIntlMessages in MyPageMessages.ts.
 */

import { LOCALE } from 'shared/models/LocaleModel';
import { createIntlMessages } from 'shared/services/MessagesService';

export const UnitsMessages = createIntlMessages({
    meta: {
        // namespace when used as an add on
        namespace: 'shared.units'
    },
    [LOCALE.EN_US]: {
        km: {
            singular: 'Kilometer',
            plural: 'Kilometers'
        },
        ac: {
            singular: 'Acre',
            plural: 'Acres'
        },
        ha: {
            singular: 'Hectare',
            plural: 'Hectares'
        }
    },
    [LOCALE.ES_ES]: {
        km: {
            singular: 'Kilómetro',
            plural: 'Kilometros'
        },
        ac: {
            singular: 'Acre',
            plural: 'Hectáreas'
        },
        ha: {
            singular: 'Hectárea',
            plural: 'Hectáreas'
        }
    },
    [LOCALE.FR_FR]: {
        km: {
            singular: 'Kilomètre',
            plural: 'Kilomètres'
        },
        ac: {
            singular: 'Acre',
            plural: 'Acres'
        },
        ha: {
            singular: 'Hectare',
            plural: 'Hectares'
        }
    }
});
