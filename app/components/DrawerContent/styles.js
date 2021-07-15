import {StyleSheet, Platform} from 'react-native';
import {BaseColor, BaseStyle} from '@config';
import * as Utils from '@utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  topDrawerSection: {
    marginBottom: 15,
  },
  userInfoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  drawerSection: {
    //flex: 1,
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#000000',
    borderTopWidth: 1,
  },

  drawerItem: {
    flexDirection: 'row',
    paddingLeft: wp('3.03%'),
    paddingVertical: hp('1.2%'),
    width: wp('100%'),
  },
  img: {
    width: wp('6%'),
    height: Utils.scaleWithPixel(24, 1),
    marginHorizontal: 15,
  },
  img_extra: {
    width: Utils.scaleWithPixel(70, 1),
    height: Utils.scaleWithPixel(70, 1),
    marginRight: 5,
    tintColor: '#FFFFFF60',
  },
  contentButton: {
    marginTop: hp('4.46%'), //50,
    marginBottom: hp('1.11%'), //10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    //width: Utils.scaleWithPixel(220)
  },
  referalContent: {
    width: '70%',
    marginRight: 5,
    paddingLeft: 10,
    //backgroundColor: 'yellow'
  },
  gradientShadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#FF5733',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.6,
        shadowRadius: 9,
      },
      default: {
        elevation: 5,
      },
    }),
  },
  drawerGradient: {
    paddingVertical: hp('1.11%'), //10,
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //MODAL
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 25,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      default: {
        elevation: 2,
      },
    }),
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
