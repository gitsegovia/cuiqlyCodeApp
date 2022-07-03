import {StyleSheet, Platform} from 'react-native';
import {BaseColor} from './theme';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    paddingBottom: 5,
    margin: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  textInputBottom: {
    marginBottom: 15,
  },
  textInputSquare: {
    width: wp('13'),
    height: wp('15'),
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: wp('7%'),
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    
  },
  safeAreaView: {
    flex: 1,
  },
  contain: {
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containForm: {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowFlexStart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  columnFormLeft: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 0.5,
    paddingRight: 15,
  },
  columnFormRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 0.5,
  },
  containFlex: {
    padding: 20,
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  logo: {
    width: '90%',
    maxHeight: 300,
    minHeight: 170,
  },
  logoSmall: {
    width: '75%',
    maxHeight: 280,
    minHeight: 150,
  },
  contentTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  inputTitle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },
  inputTitleCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  inputAndroid: {
    fontSize: 15,
    lineHeight: 17,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 5,
    borderWidth: 0,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    color: '#767474',
    paddingRight: 30,
  },
  iconContainer: {
    top: 8,
    right: 8,
  },
  //TODO style modal native buscar donde este manual y quitar
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
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
        elevation: 5,
      },
    }),
    width: '70%',
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
  //MODAL
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  lineColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconRight: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentPickDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 10,
  },
  itemPick: {
    flex: 1,
    justifyContent: 'center',
  },
  linePick: {
    width: 1,
    marginHorizontal: 10,
  },
});
