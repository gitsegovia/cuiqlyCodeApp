import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Typography, FontWeight, BaseColor, useTheme,ColorFontBold,ColorFont} from '@config';

const Roboto = {
  100: 'Thin',
  200: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Medium',
  700: 'Bold',
  800: 'Bold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const Raleway = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const SFProDisplay = {
  100: 'Thin',
  200: 'Ultralight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
  800: 'Heavy',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const Merriweather = {
  100: 'Light',
  200: 'Light',
  300: 'Light',
  400: 'Regular',
  500: 'Regular',
  600: 'Bold',
  700: 'Bold',
  800: 'Bold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

export default function Index(props) {
  const {
    //props style
    header,
    title1,
    title2,
    title3,
    headline,
    body1,
    body2,
    callout,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    primaryColor,
    darkPrimaryColor,
    lightPrimaryColor,
    accentColor,
    grayColor,
    dividerColor,
    whiteColor,
    fieldColor,
    //numberOfLines
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
    onPress,
  } = props;

  const {colors} = useTheme();
  //const font = useFont();
  //{fontFamily: font, },
  //TODO color fuente en negritas #2b3e49
// TODO color fuente #696969
  let textStyle = StyleSheet.flatten([
    {textAlign: textAlign},
    header && Typography.header,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    callout && Typography.callout,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,    
    // default color
    {color: colors.text},
    //custom for font
    thin && {fontWeight: FontWeight.thin, color: ColorFont},
    ultraLight && {fontWeight: FontWeight.ultraLight, color: ColorFont},
    light && {fontWeight: FontWeight.light, color: ColorFont},
    regular && {fontWeight: FontWeight.regular, color: ColorFontBold},
    medium && {fontWeight: FontWeight.medium, color: ColorFontBold},
    semibold && {fontWeight: FontWeight.semibold, color: ColorFontBold},
    bold && {fontWeight: FontWeight.bold, color: ColorFontBold},
    heavy && {fontWeight: FontWeight.heavy, color: ColorFontBold},
    black && {fontWeight: FontWeight.black, color: ColorFontBold},
    //custom for color
    primaryColor && {color: colors.primaryColor},
    darkPrimaryColor && {color: colors.primaryDark},
    lightPrimaryColor && {color: colors.primaryLight},
    accentColor && {color: colors.accent},
    grayColor && {color: BaseColor.grayColor},
    dividerColor && {color: BaseColor.dividerColor},
    whiteColor && {color: BaseColor.whiteColor},
    fieldColor && {color: BaseColor.fieldColor},
    style && style,
  ]);
  /*
`${textStyle.fontFamily}-${
          Raleway[textStyle.fontWeight] == 'Regular'
            ? Raleway[textStyle.fontWeight]
            : Raleway[textStyle.fontWeight] + fontStyle
        }`;*/
  /*if (textStyle.fontFamily) {
    const fontStyle = textStyle.fontStyle == 'italic' ? 'Italic' : '';
    switch (textStyle.fontFamily) {
      case 'Raleway':
        textStyle.fontFamily = `${textStyle.fontFamily}-Regular`;
        break;
      case 'Roboto':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Roboto[textStyle.fontWeight] == 'Regular'
            ? Roboto[textStyle.fontWeight]
            : Roboto[textStyle.fontWeight] + fontStyle
        }`;
        break;
      case 'Merriweather':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          Merriweather[textStyle.fontWeight] == 'Regular'
            ? Merriweather[textStyle.fontWeight]
            : Merriweather[textStyle.fontWeight] + fontStyle
        }`;
        break;
      case 'SF-Pro-Display':
        textStyle.fontFamily = `${textStyle.fontFamily}-${
          SFProDisplay[textStyle.fontWeight] == 'Regular'
            ? SFProDisplay[textStyle.fontWeight]
            : SFProDisplay[textStyle.fontWeight] + fontStyle
        }`;
        break;
      default:
        break;
    }
  }*/

  if (onPress !== undefined) {
    return (
      <Text style={textStyle} numberOfLines={numberOfLines} onPress={onPress}>
        {children}
      </Text>
    );
  }
  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

// Define typechecking
Index.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,
  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  //custon for text color
  primaryColor: PropTypes.bool,
  darkPrimaryColor: PropTypes.bool,
  lightPrimaryColor: PropTypes.bool,
  accentColor: PropTypes.bool,
  grayColor: PropTypes.bool,
  dividerColor: PropTypes.bool,
  whiteColor: PropTypes.bool,
  fieldColor: PropTypes.bool,
  //numberOfLines
  numberOfLines: PropTypes.number,
  textAlign: PropTypes.string,
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node, // plain text
  onPress: PropTypes.func,
};

Index.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  body1: false,
  body2: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  //custon for text color
  primaryColor: false,
  darkPrimaryColor: false,
  lightPrimaryColor: false,
  accentColor: false,
  grayColor: false,
  dividerColor: false,
  whiteColor: false,
  fieldColor: false,
  //numberOfLines
  numberOfLines: 10,
  textAlign: 'left',
  //custom style
  style: {},
  children: '',
};
