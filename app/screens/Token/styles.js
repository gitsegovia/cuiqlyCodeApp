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
    gradient: {
        width: wp('70%'),
        height: wp('70%'),
        borderRadius: wp('70%')/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradientOff: {
        width: wp('70%'),
        height: wp('70%'),
        borderRadius: wp('70%')/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCCC',
        ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.12,
              shadowRadius: 6,
            },
            default: {
                elevation: 4
            }
          }),
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