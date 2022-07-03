import React, {useState, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

function Loading({navigation}) {
  const [isLottie, setIsLottie] = useState(true);
  //const {publicationId} = route.params;
  const progress = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished === true) {
        navigation.navigate('LoadingTwo');
      }
    });
  }, []);
  

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

export default Loading;
