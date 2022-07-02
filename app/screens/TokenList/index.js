import React from 'react';
import {View, } from 'react-native';
import { useSelector } from 'react-redux';

import PinSecurity from './pinSecurity';
import TokenList from './tokenList';

export default function Content(props) {
  const validatePin = useSelector(state => state.tokenList.validate)
  
  if(validatePin){
    return (
      <View style={{flex:1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
        <TokenList />
      </View>
    )
  }
  return (
    <View style={{flex:1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
      <PinSecurity />
    </View>
  )
}