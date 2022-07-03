import {Platform, StyleSheet} from 'react-native';
import {BaseColor} from 'config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  tabbar: {
    marginTop: 2,
    height: 50,
    backgroundColor: Platform.OS==='android' ? '#d5eaef' : '#d5eaef',
    borderWidth: 0,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }, 
  tabStyle: {
    height: hp('6.13%'),
    margin: 0,
    padding: 0,
  },
  indicatorStyle: {
    marginTop: 0,
    height: 50,
    backgroundColor: '#cddbdc',
    borderRadius: 24,
  },
});
