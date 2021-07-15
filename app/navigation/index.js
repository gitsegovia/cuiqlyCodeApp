import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Icon from '@components/Icon'
import {useTheme, BaseSetting} from '@config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector, connect} from 'react-redux';

import Login from '@screens/Login';
import Drawer from 'app/navigation/drawer';

const RootStack = createStackNavigator();



function Navigator({login}) {
  const storeLanguage = useSelector(state => state.application.language);
  const {theme, colors} = useTheme();

  const options = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  i18n.use(initReactI18next).init({
    resources: BaseSetting.resourcesLanguage,
    lng: storeLanguage ?? BaseSetting.defaultLanguage,
    fallbackLng: BaseSetting.defaultLanguage,
    initImmediate: false,
  });

  useEffect(() => {
    //TODO aqui esta lo que necesito para cambiar el estilo de la barra superior
    StatusBar.setBackgroundColor('#fff0', true);
    //StatusBar.setTranslucent(true);
    //TODO activar esto
    // StatusBar.setBarStyle(
    //   colorScheme == 'light' ? 'light-content' : 'dark-content',
    //   true,
    // );
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator headerMode='none' initialRouteName={login.success === true ? 'Drawer' : 'Login'}>
        <RootStack.Screen name="Login" component={Login} options={options} />
        <RootStack.Screen name="Drawer" component={Drawer} options={options} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => ({
  login: state.auth.login
})

export default connect(mapStateToProps, {})(Navigator)