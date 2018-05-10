/**
 * A service that handles the rendering a page
 */

declare const navigator: {
    languages: string[];
    language: string;
    userLanguage: string;
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, Store } from 'react-redux';

import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as es from 'react-intl/locale-data/es';
import * as fr from 'react-intl/locale-data/fr';
import { IIntlMessages } from '../models/IntlMessagesModel';
import { LOCALE } from '../models/LocaleModel';

import { MainFooter } from '../components/MainFooter';
import { MainHeader } from '../components/MainHeader';

interface IRenderOptions {
    noHeader?: boolean;
    noFooter?: boolean;
}

function getLocale(messages: IIntlMessages): LOCALE {
    let locale: LOCALE;
    const lang =
        (navigator.languages && navigator.languages[0])
        || navigator.language
        || navigator.userLanguage
        || '';

    if (lang === 'en' || lang.split('-')[0] === 'en') {
        locale = LOCALE.EN_US;
    } else if (lang === 'es' || lang.split('-')[0] === 'es') {
        locale = LOCALE.ES_ES;
    } else if (lang === 'fr' || lang.split('-')[0] === 'fr') {
        locale = LOCALE.FR_FR;
    } else {
        locale = LOCALE.EN_US;
    }

    if (!Object.keys(messages).includes(locale)) {
        locale = LOCALE.EN_US;
    }

    return locale;
}

export function renderPage(
    PageComponent: React.ComponentClass | React.StatelessComponent,
    messages: IIntlMessages,
    store: Store<any>,
    options: IRenderOptions = {}
) {
    addLocaleData([...en, ...es, ...fr]);
    const locale = getLocale(messages);

    // Render the Main Header
    if (!options.noHeader) {
        if (document.querySelector('#header-root')) {
            ReactDOM.render(
                <Provider store={store}>
                    <IntlProvider locale={locale} messages={messages[locale]}>
                        <MainHeader />
                    </IntlProvider>
                </Provider>,
                document.getElementById('header-root')
            );
        }
    }

    // Render the Main Footer
    if (!options.noFooter) {
        if (document.querySelector('#footer-root')) {
            ReactDOM.render(
                <Provider store={store}>
                    <IntlProvider locale={locale} messages={messages[locale]}>
                        <MainFooter />
                    </IntlProvider>
                </Provider>,
                document.getElementById('footer-root')
            );
        }
    }

    // Render the Page
    if (document.querySelector('#page-root')) {
        ReactDOM.render(
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <PageComponent />
                </IntlProvider>
            </Provider>,
            document.getElementById('page-root')
        );
    }

}
