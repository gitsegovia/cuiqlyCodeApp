import React, {useEffect, useState} from 'react';
import {View, Animated, Easing} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

function Loading({navigation, finishLogo,login}) {

  const onProcess = () => {
    if (finishLogo === true && login.success === true) {
      navigation.replace('Main');
      return;
    }
    if(login.success === false){
      navigation.navigate('Login')
    }
  };

  useEffect(() => {
    onProcess();
  }, [finishLogo, login]);

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <LottieView
        style={{width: wp('30%'), height: hp('30%')}}
        source={require('../../assets/lotties/1.-Loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  finishLogo: state.checkLogo.finishLogo,
  login: state.auth.login,
});

export default connect(mapStateToProps)(Loading);
