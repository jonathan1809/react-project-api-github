import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducer from './redux/storeReducers';

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
};

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(logger, thunk)
));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
