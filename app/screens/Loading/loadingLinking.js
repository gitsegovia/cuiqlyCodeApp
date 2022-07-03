import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Animated, Easing} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {CheckLogoActions} from '@actions';
import LoadingComponent from '@components/Loading';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

function Loading({navigation, route}) {
  const [isLottie, setIsLottie] = useState(true);
  const progress = new Animated.Value(0);
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished === true) {
        setIsLottie(false);
        dispatch(CheckLogoActions.onSetFinishLogoApp(true));
        dispatch(CheckLogoActions.onSetRefreshPubli(false));
        navigation.navigate('LoadingTwo');
      }
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch(CheckLogoActions.onSetRefreshPubli(true));
    }, []),
  );

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <LottieView
        style={{width: wp('120.77%'), height: hp('55.80%')}}
        source={require('../../assets/lotties/Cuiqly_Logo.json')}
        progress={progress}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  showTutorial: state.cuiqlyApp.tutorial,
  locationPub: state.cuiqlyApp.locationPub,
});

export default Loading;
