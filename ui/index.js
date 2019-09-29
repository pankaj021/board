import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSocketMiddleware from './middleware/createSocketMiddleware';
import reducer from './reducers';
import App from './components/App';
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, logger, createSocketMiddleware)
));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
