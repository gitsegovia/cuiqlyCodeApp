import {useSelector} from 'react-redux';
import {useColorScheme} from 'react-native';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  blackColor: '#000000',
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#FDC60A',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
  outrageousOrange: '#FF5733',
  redCustom: '#F80808', // #F80808
  scarlet: '#FF010B', //'#FF3108',
  tarawera: '#093254',
  denim: '#1472B8',
  scooter: '#34C3C3',
  alto: '#E0E0E0',
  frenchRose: '#F5507D',
  seaBuckthorn: '#F9AA33',
  apple: '#64BA36',
  lochmara: '#007BC1',
  chathamsBlue: '#124B7C',
  nobel: '#B7B4B4',
  concrete: '#F2F2F2',
  amber: '#FFC300',
  monza: '#C70139',
  roseBudCherry: '#900C3E',
  wineBerry: '#571845',
  doveGray: '#707070',
  success: '#009944',
  error: '#cf000f',
  warning: '#f0541e',
  info: '#63c0df',
  hawkesBlue: '#E8F4FD',
  sail: '#B0D9F7',
};

/**
 * Define Const list theme use for whole application
 */
export const ThemeSupport = [
  {
    theme: 'cuiqly',
    light: {
      dark: false,
      colors: {
        primary: 'white',
        primaryColor: '#FF010B',
        primaryDark: '#F80808',
        primaryLight: '#F57155',
        secundaryColor: '#093254',
        accent: 'black',
        background: 'white',
        card: '#F5F5F5',
        text: '#000000',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: 'white',
        primaryColor: '#FF010B',
        primaryDark: '#F80808',
        primaryLight: '#F57155',
        secundaryColor: '#093254',
        accent: 'black',
        background: 'white',
        card: '#F5F5F5',
        text: '#000000',
        border: '#c7c7cc',
      },
    },
  },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  theme: 'cuiqly',
  light: {
    dark: false,
    colors: {
      primary: 'white',
      primaryColor: '#FF010B',
      primaryDark: '#F80808',
      primaryLight: '#F57155',
      secundaryColor: '#093254',
      accent: 'black',
      background: 'white',
      card: '#F5F5F5',
      text: '#000000',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: 'white',
      primaryColor: '#FF010B',
      primaryDark: '#F80808',
      primaryLight: '#F57155',
      secundaryColor: '#093254',
      accent: 'black',
      background: 'white',
      card: '#F5F5F5',
      text: '#000000',
      border: '#c7c7cc',
    },
  },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = [
  'Raleway',
  'Roboto',
  'Merriweather',
  'SF-Pro-Display',
];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'SF-Pro-Display';

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const forceDark = useSelector(state => state.application.force_dark);
  const themeStorage = useSelector(state => state.application.theme);
  const listTheme = ThemeSupport.filter(item => item.theme == themeStorage);
  const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

  if (forceDark) {
    return {theme: theme.dark, colors: theme.dark.colors};
  }
  if (forceDark == false) {
    return {theme: theme.light, colors: theme.light.colors};
  }
  return colorScheme == 'dark'
    ? {theme: theme.dark, colors: theme.dark.colors}
    : {theme: theme.light, colors: theme.light.colors};
};

/**
 * export font for application
 * @returns font
 */
export const useFont = () => {
  const font = useSelector(state => state.application.font);
  return font ?? DefaultFont;
};
