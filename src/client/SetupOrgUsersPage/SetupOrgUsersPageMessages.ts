import { LOCALE } from '../shared/models/LocaleModel';
import { createIntlMessages } from '../shared/services/MessagesService';

export const Messages = createIntlMessages({
    [LOCALE.EN_US]: {
        header: {
            title: 'Setup Org Users Page',
        },
        greetings: {
            welcome: 'Welcome!',
            instructions: 'Config your peeps'
        }
    },
    [LOCALE.ES_ES]: {
        header: {
            title: 'Configurar página de usuarios',
        },
        greetings: {
            welcome: 'Bienvenido!',
            instructions: 'Configura tu gente'
        }
    },
    [LOCALE.FR_FR]: {
        header: {
            title: 'Configuration des utilisateurs',
        },
        greetings: {
            welcome: 'Bienvenue!',
            instructions: 'Configurez votre peuple'
        }
    }
});
