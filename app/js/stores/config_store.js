import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { devTools } from 'redux-devtools';
import { createHistory, useBasename } from 'history';
import routes from '../routes/user_routes';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/user_home_reducer';

const createHistoryWithBasename = (historyOptions) => {
    return useBasename(createHistory)({
        basename: '/user_home'
    })
}

const finalCreateStore = compose(
    applyMiddleware(thunk, createLogger()),
    reduxReactRouter({ routes: routes,
        createHistory: createHistoryWithBasename }),
    devTools()
)(createStore);

export function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}
