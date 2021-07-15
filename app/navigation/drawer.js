import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '@components/DrawerContent';
import Token from '@screens/Token';
import TokenList from '@screens/TokenList';
import Header from '@components/Header';

import {Images, useTheme, BaseColor, ColorFontBold} from '@config';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator 


      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Token">
      <Drawer.Screen
        name="Token"
        component={Token}
        options={{
          header: () => {
            return (
              <Header
                title="hello"
                renderLeft={() => {
                  return (
                    <Icon
                      name="bars"
                      size={20}
                      color={colors.accent}
                      enableRTL={true}
                    />
                  );
                }}
              />
            );
          },
        }}
      />
      <Drawer.Screen name="TokenList" component={TokenList} />
    </Drawer.Navigator>
  );
}
