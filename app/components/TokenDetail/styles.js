import React from 'react';
import {StyleSheet, I18nManager} from 'react-native';
import {BaseStyle, BaseColor} from 'config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  contain: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FF00',
  },
  showShadow: {
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 5,
    flex: 0.5,
  },
  contentShadow: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingBottom: 8,
    borderRadius: 12,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
});
