import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middlewere = [thunk];

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewere),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);


export default store;
