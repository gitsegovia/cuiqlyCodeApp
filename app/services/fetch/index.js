import React, {useEffect, useState, useRef} from 'react';
import {Platform, AppState} from 'react-native';
import {useDispatch, useSelector, connect} from 'react-redux';
import {useApolloClient} from '@apollo/client';
import NetInfo from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';

import {USER, USERDEVICE, getGraphQlError} from 'gqlApollo';

import {
  AuthActions,
  NetInfoActions,
  CheckLogoActions,
  AppInfoActions
} from 'actions';

const FetchApp = ({children, login, appInfo}) => {
  const dispatch = useDispatch();
  const {query, mutate} = useApolloClient();

  useEffect(() => {
    fetchCheckUser()
  }, [])
  

  
  const fetchCheckUser = async () => {
    if(appInfo.tokenDevice===''){
      const inputCreate = {
        tokenDevice: DeviceInfo.getUniqueId(),
        device: Platform.OS,
        appVersion: VersionCheck.getCurrentVersion()
      }
      try {
        const {errors, data} = await mutate({
          mutation: USERDEVICE.MUTATIONS.createTokenUserDevice,
          variables: {input: inputCreate},
          fetchPolicy: 'no-cache',
        }); 
        if(errors && errors.length > 0){
          dispatch(AppInfoActions.onSetInfoDevice(''))
        }
        if(data && data.createTokenUserDevice){
          dispatch(AppInfoActions.onSetInfoDevice(DeviceInfo.getUniqueId()))
        }
      } catch (err) {
        dispatch(AppInfoActions.onSetInfoDevice(''))        
        console.error(getGraphQlError(err).messages);
      }

    }
    if (login.success === true) {
      try {
        const input = {token: login.token, tokenDevice: appInfo.tokenDevice}
        console.error('input checkTokenUserValid', input);
        const {errors, data} = await query({
          query: USER.QUERYS.checkTokenUserValid,
          variables: {input: input},
          fetchPolicy: 'no-cache',
        });
        if (errors && errors.length > 0) {
          dispatch(AuthActions.onLogout())
          await mutate({
            mutation: USERDEVICE.MUTATIONS.deleteTokenUserDevice,
            variables: {input: {tokenDevice: appInfo.tokenDevice}},
            fetchPolicy: 'no-cache',
          });        
        }
        if (data) {
          console.error('checkTokenUserValid', data.checkTokenUserValid);
          if(data.checkTokenUserValid==='' || data.checkTokenUserValid===null){
            dispatch(AuthActions.onLogout())
            await mutate({
              mutation: USERDEVICE.MUTATIONS.deleteTokenUserDevice,
              variables: {input: {tokenDevice: appInfo.tokenDevice}},
              fetchPolicy: 'no-cache',
            });  
          }else{
            // return token update autyh token
            const inputSync = {
              userId: login.userId,
              tokenDevice: appInfo.tokenDevice!=='' ? appInfo.tokenDevice : DeviceInfo.getUniqueId(),
              appVersion: VersionCheck.getCurrentVersion()
            };
            mutate({
              mutation: USERDEVICE.MUTATIONS.syncTokenUserDevice,
              variables: {input: inputSync},
              fetchPolicy: 'no-cache',
            });
            
            dispatch(AuthActions.onLoginToken(data.checkTokenUserValid))
            dispatch(CheckLogoActions.onSetFinishLogoApp())
          }
        }
      } catch (err) {
        dispatch(AuthActions.onLogout())
        mutate({
          mutation: USERDEVICE.MUTATIONS.deleteTokenUserDevice,
          variables: {input: {tokenDevice: appInfo.tokenDevice}},
          fetchPolicy: 'no-cache',
        });        
        console.error(getGraphQlError(err).messages);
      }
    }
  }

  return null;
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    appInfo: state.appInfo,
  };
};

export default connect(mapStateToProps)(FetchApp);