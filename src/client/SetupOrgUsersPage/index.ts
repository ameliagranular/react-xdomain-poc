import { renderPage } from '../shared/services/PageService';

import { SetupOrgUsersPage } from './SetupOrgUsersPage';

import { Messages } from './SetupOrgUsersPageMessages';

import { Store } from './SetupOrgUsersPageStore';

renderPage(SetupOrgUsersPage, Messages, Store);
