/**
 * A service that handles the creation of a Redux store.
 */

import {
    applyMiddleware,
    Reducer,
    createStore as createReduxStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export function createStore(reducer: Reducer<{}>) {

    // create the redux store
    const store = createReduxStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk))
    );

    // extend the dispatch function to include subscribe
    const dispatch = store.dispatch;
    store.dispatch = function (action: any) {
        if (typeof action === 'function') {
            return action(store.dispatch, store.getState, store.subscribe);
        }
        return dispatch(action);
    };

    return store;
}
