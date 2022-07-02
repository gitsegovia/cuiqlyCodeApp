import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import {TokenListActions} from 'actions'
import * as Utils from 'utils';
import styles from './styles';
import TokenScreen from 'screens/Token'
import TokenListScreen from 'screens/TokenList'

const PADDING = wp('15%');

export default function Content(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tokenCreate', title: t('token')},
    {key: 'tokenList', title: t('record')}
  ]);
  const login = useSelector(state => state.auth.login)

  useEffect(() => {
    if(login?.success===false){
      navigation.navigate('Login')
    }
  
    return () => {
      
    }
  }, [login])
  

  const handleIndexChange = (valor) => {
    dispatch(TokenListActions.onSetTokenListRefreshe(Math.random()));
    setIndex(valor);
  }

  const renderTabBar = (props) => {
    const tabWidth = Utils.getWidthDevice() - PADDING * 2 - 7;
    return (
      <TouchableOpacity activeOpacity={0} style={[{width: tabWidth, marginLeft: '14%'}]}>
        <TabBar
          {...props}
          style={[styles.tabbar,{elevation: 0}]}
          tabStyle={[
            styles.tabStyle,
            {
              width: tabWidth / 2,
            },
          ]}
          pressOpacity={0}
          pressColor='transparent'
          indicatorStyle={styles.indicatorStyle}
          inactiveColor={'#fff'}
          activeColor={'#fff'}
          scrollEnabled={true}
          renderIndicator={({navigationState, width, style, getTabWidth}) => {
            let lastElement = 0;
            for (let index = 0; index < navigationState.index; index++) {
              lastElement += tabWidth/2;
            }
            const wtab= tabWidth/2;
            let widthView = wtab*1;
            let marginLeft = lastElement + (wtab * 0);
            return (
              <View
                style={[
                  style,
                  {
                    width: widthView,
                    marginLeft: marginLeft,
                    ...Platform.select({
                      ios: {
                        shadowColor: '#888888',
                        shadowOffset: {height: 2, width: 2},
                        shadowOpacity: 0.35,
                        shadowRadius: 4,
                      },
                      default: {
                        elevation: 8,
                      },
                    }),
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}></View>
            );
          }}
          renderLabel={({route, focused, color}) => (
            <View style={{height: 30}}>
              <Text
                callout
                medium
                style={{color: 'black', margin: 0, padding: 0}}>
                {route.title}
              </Text>
            </View>
          )}
        />
      </TouchableOpacity>
    );
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'tokenCreate':
        return (
          <TokenScreen />
        )
      case 'tokenList':
        return (<TokenListScreen />)
    }
  }

  return (
    <View style={{flex:1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
      <TabView 
          lazy
          style={[{ marginHorizontal: 0, width: '100%', marginTop: hp('8%')}]} 
          navigationState={{index,routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />
    </View>
  )
}
