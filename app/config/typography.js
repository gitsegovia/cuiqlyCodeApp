import {StyleSheet} from 'react-native';

export const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

export const ColorFontBold= '#2b3e49';
export const ColorFont = '#696969';

export const FontLetterSpacing = 0.5;

export const Typography = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title1: {
    fontSize: 28,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title2: {
    fontSize: 22,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  title3: {
    fontSize: 20,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  headline: {
    fontSize: 18,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  body1: {
    fontSize: 17,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  body2: {
    fontSize: 16,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  callout: {
    fontSize: 15,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  subhead: {
    fontSize: 14,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  footnote: {
    fontSize: 13,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  caption1: {
    fontSize: 12,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  caption2: {
    fontSize: 11,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
  overline: {
    fontSize: 10,
    fontWeight: FontWeight.regular,
    letterSpacing: FontLetterSpacing,
  },
});
