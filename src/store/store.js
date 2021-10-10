import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {AsyncStorage} from 'react-native';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import {reducer as network} from 'react-native-offline';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  network,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(axiosMiddleware(axios), thunk)),
);

let persistor = persistStore(configureStore);

export {configureStore, persistor};
