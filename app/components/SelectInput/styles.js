import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputIOS: {
    paddingVertical: 5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    height: 35, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 35,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
