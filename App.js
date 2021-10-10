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
import configureStore from './src/store/store';
import {Provider as PaperProvider} from 'react-native-paper';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </NativeRouter>
    </Provider>
  );
};

export default App;
