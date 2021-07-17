import React from 'react';
import {StyleSheet, I18nManager} from 'react-native';
import {BaseStyle, BaseColor} from '@config';
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
    width: wp('50%') - 30,
    marginHorizontal: 15 / 2,
    marginTop: 15 / 2,
    marginBottom: 15,
    flex: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      default: {
        elevation: 4,
      },
    }),

    borderRadius: 12,
  },
  contentShadow: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
});
