/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import Router from './src/navigation/routes';
import {NativeRouter} from 'react-router-native';
import {configureStore, persistor} from './src/store/store';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {NetworkProvider} from 'react-native-offline';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeRouter>
          <PaperProvider>
            <NetworkProvider shouldPing={true} pingInterval={100}>
              <Router />
            </NetworkProvider>
          </PaperProvider>
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
