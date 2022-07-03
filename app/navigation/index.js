import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector, connect} from 'react-redux';

import {useTheme, BaseSetting} from 'config';
import ContentScreen from './content';
// import ContentScreen from 'screens/TokenList/tokenList';
import LoginScreen from 'screens/Login';
import LoadingScreen from 'screens/Loading';
import LoadingTwoScreen from 'screens/Loading/loadingTwo';

const RootStack = createStackNavigator();

function Navigator({login}) {
  const storeLanguage = useSelector(state => state.application.language);
  const {theme, colors} = useTheme();

  const options = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  i18n.use(initReactI18next).init({
    resources: BaseSetting.resourcesLanguage,
      lng: BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
      compatibilityJSON: 'v3',
  });

  useEffect(() => {
    //TODO aqui esta lo que necesito para cambiar el estilo de la barra superior
    //TODO activar esto
    // StatusBar.setBarStyle(
    //   colorScheme == 'light' ? 'light-content' : 'dark-content',
    //   true,
    // );
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  /**
   * when reducer language change
   */
  useEffect(() => {
    i18n.changeLanguage(storeLanguage);
  }, [storeLanguage]);

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Loading"
      >
        <RootStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="LoadingTwo"
          component={LoadingTwoScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen name="Login" component={LoginScreen} options={options} />
        <RootStack.Screen name="Main" component={ContentScreen} options={options} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => ({
  login: state.auth.login
})

export default connect(mapStateToProps, {})(Navigator)