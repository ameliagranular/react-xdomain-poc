/**
 * A service that provides various utilites for unit testing.
 */

import 'jest';  // necessary for types
import toJson from 'enzyme-to-json';

import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { LOCALE } from 'shared/models/LocaleModel';
import { IAjaxServiceRequest } from './AjaxService';
import { ILocaleMessages } from 'shared/models/IntlMessagesModel';

export function mockDate() {
    Date.now = () => 1111111111111;
}

export function doSnapshotTestWithAllLocales(
    props: any,
    doMount: (props: any, locale?: LOCALE) => ReactWrapper | ShallowWrapper
) {
    expect(toJson(doMount(props))).toMatchSnapshot();
    expect(toJson(doMount(props, LOCALE.EN_US))).toMatchSnapshot();
    expect(toJson(doMount(props, LOCALE.ES_ES))).toMatchSnapshot();
    expect(toJson(doMount(props, LOCALE.FR_FR))).toMatchSnapshot();
}

export function childAtLevel(
    componentTree: ReactWrapper | ShallowWrapper,
    n: number
) {
    let component = componentTree;
    for (let i = 0; i < n; i += 1) {
        component = component.childAt(0);
    }
    return component;
}

export function getIntlInjection(locale: string, messages: ILocaleMessages) {
    const intlProvider = new IntlProvider({locale, messages}, {});
    return intlProvider.getChildContext().intl;
}

export function checkAjaxRequestMatches(
    request: IAjaxServiceRequest,
    expectedRequest: IAjaxServiceRequest
) {
    // verify that the request matches exactly
    expect(request).toMatchObject(expectedRequest);
    expect(expectedRequest).toMatchObject(request);
}
