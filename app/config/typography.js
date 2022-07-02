import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: Platform.OS==='ios'?'600': '800',
  bold: '700',
  heavy: '800',
  black: '900',
};

export const ColorFontBold = '#2b3e49';
export const ColorFont = '#696969';

export const FontLetterSpacing = 0.5;

export const Typography = StyleSheet.create({
  header: {
    fontSize: wp('8.21%'),//34,// wp('10%'), //34,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title1: {
    fontSize: wp('6.76%'),//28,// wp('9%'), //28,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title2: {
    fontSize: wp('5.31%'),//22,// wp('8%'), //22,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title3: {
    fontSize: wp('4.83%'),//20,// wp('7%'), //20,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  headline: {
    fontSize: wp('4.34%'),//18,// wp('6.5%'), //18,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  body1: {
    fontSize: wp('4.10%'),//17,// wp('6%'), //17,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  body2: {
    fontSize: wp('3.86%'),//16,// wp('5.5%'), //16,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  callout: {
    fontSize: wp('3.62%'),//15,// wp('5%'), //15,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  subhead: {
    fontSize: wp('3.38%'),//14,// wp('4.5%'), //14,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  footnote: {
    fontSize: wp('3.14%'),//13,// wp('4%'), //13,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  caption1: {
    fontSize: wp('2.89%'),//12,// wp('3.5%'), //12,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  caption2: {
    fontSize: wp('2.65%'),//11,// wp('3%'), //11,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  overline: {
    fontSize: wp('2.41%'),//10,// wp('2.8%'), //10,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
});
