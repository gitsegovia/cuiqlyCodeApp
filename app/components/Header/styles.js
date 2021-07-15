import React from 'react';
import {StyleSheet, I18nManager} from 'react-native';
import {BaseStyle, BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FF00',
  },
  borderContain: {
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 0.5,
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 60,
  },
  contentCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
