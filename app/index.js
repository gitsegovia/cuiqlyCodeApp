import React, {useEffect, useState, useRef} from 'react';
import {LogBox, View, StyleSheet, Animated, Easing, AppState, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApolloProvider} from '@apollo/client';
import {store, persistor} from 'app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment-timezone';

import ClientApollo from 'services/apollo';
import SocketProvider from 'services/websocket'
import FetchApp from 'services/fetch';
import Navigator from './navigation';

LogBox.ignoreAllLogs(false);

export default function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let closeApp = '';
  const listen = useRef();

  useEffect(() => {
    if (listen.current) {
      listen.current.remove();
    }
    listen.current = AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      if (listen.current) {
        listen.current.remove();
      }
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (nextAppState !== 'active') {
      closeApp = moment();
    }
    if (nextAppState === 'active') {
      if (closeApp !== '') {
        const restart = moment();
        const duration = moment.duration(restart.diff(closeApp));
        const minutes = parseInt(duration.asMinutes()) % 60;
        if (minutes > 1) {
          setRefresh(true);
        }
      }
    }
  };

  if (refresh === true) {
    setTimeout(() => {
      setRefresh(false);
    }, 500);
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}></View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}> 
      <ApolloProvider client={ClientApollo}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider />
            <FetchApp />
            <Navigator />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </GestureHandlerRootView>
  )
}
