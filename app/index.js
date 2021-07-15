import React, {useState, useEffect} from 'react';
import {
  LogBox,
  useColorScheme,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  View
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigator from './navigation';

import {store, persistor} from 'app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ClientApollo from '@services/apolloClient';
import {ApolloProvider} from '@apollo/client';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

LogBox.ignoreAllLogs(false);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLottie, setIsLottie] = useState(true);
  const progress = new Animated.Value(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsLottie(false);
    });
  }, []);

  if (isLottie) {
    return (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <LottieView
          style={{width: wp('120.77%'), height: hp('55.80%')}}
          source={require('./assets/lotties/Cuiqly_Logo.json')}
          progress={progress}
        />
      </View>
    );
  }

  return (
    <ApolloProvider client={ClientApollo}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
