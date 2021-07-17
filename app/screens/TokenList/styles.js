import {StyleSheet, Platform} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
  },
  text: {
    color: '#09f',
    fontSize: 16,
    fontWeight: '700',
  },
  inputSearch: {
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 0,
    height: 45,
    backgroundColor: BaseColor.whiteColor,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      default: {
        elevation: 4,
      },
    }),
  },
});
