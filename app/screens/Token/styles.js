import { StyleSheet, Platform } from 'react-native'
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262626'
    },
    text: {
        color: '#09f',
        fontSize: 16,
        fontWeight: '700'
    },
    shadowGraddient:{
        width: wp('70%'),
        height: wp('70%'),
        borderRadius: wp('70%')/2,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#ff0207',
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.50,
              shadowRadius: 8,
            },
            default: {
              elevation: 4
            }
          }),
    },
    gradient: {
        width: wp('70%'),
        height: wp('70%'),
        borderRadius: wp('70%')/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadowGraddientOff: {      
      width: wp('70%'),
      height: wp('70%'),
      borderRadius: wp('70%')/2,
      backgroundColor: '#FFF',
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.30,
          shadowRadius: 7,
        },
        default: {
          elevation: 4
        }
      }),
    },
    gradientOff: {
        width: wp('70%'),
        height: wp('70%'),
        borderRadius: wp('70%')/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCCC',
    },
    gradientContent: {
        backgroundColor: '#FFFFFF',
        width: wp('63%'),
        height: wp('63%'),
        borderRadius: wp('63%')/2,
        borderWidth: 1,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
})