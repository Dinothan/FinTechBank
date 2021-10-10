import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(axiosMiddleware(axios.interceptors), thunk),
    ),
  );
};

export default configureStore;
