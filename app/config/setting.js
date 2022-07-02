/**
 * Basic Setting Variables Define
 */
const dev = process.env.NODE_ENV === `development`;
export const BaseSetting = {
  name: 'CuiQlyCode',
  displayName: 'CuiQly Code',
  appVersion: '0.0.1',
  defaultLanguage: 'es',
  languageSupport: [
    'en',
    'es',
    'vi',
    'ar',
    'da',
    'de',
    'el',
    'fr',
    'he',
    'id',
    'ja',
    'ko',
    'lo',
    'nl',
    'zh',
    'fa',
    'km',
  ],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    es: {
      translation: require('../lang/es.json'),
    },
    vi: {
      translation: require('../lang/vi.json'),
    },
    ar: {
      translation: require('../lang/ar.json'),
    },
    da: {
      translation: require('../lang/da.json'),
    },
    de: {
      translation: require('../lang/de.json'),
    },
    el: {
      translation: require('../lang/el.json'),
    },
    fr: {
      translation: require('../lang/fr.json'),
    },
    he: {
      translation: require('../lang/he.json'),
    },
    id: {
      translation: require('../lang/id.json'),
    },
    ja: {
      translation: require('../lang/ja.json'),
    },
    ko: {
      translation: require('../lang/ko.json'),
    },
    lo: {
      translation: require('../lang/lo.json'),
    },
    nl: {
      translation: require('../lang/nl.json'),
    },
    zh: {
      translation: require('../lang/zh.json'),
    },
    fa: {
      translation: require('../lang/fa.json'),
    },
    km: {
      translation: require('../lang/km.json'),
    },
  },
  //LOCAL
  urlApi: 'http://192.168.1.254:5000/',
  // urlApiBackend: 'http://192.168.1.101:3001/',
  // urlPage: 'http://192.168.1.101:3100/',
  // urlAssetsPage: 'http://192.168.1.101:3100/assets/',
  // urlImgsProduct: 'http://192.168.1.101:3100/imgs/products/',
  // urlImgsFlag: 'http://192.168.1.101:3100/imgs/flags/',
  // urlImgsChat: 'http://192.168.1.101:3100/app/chats/',
  // urlAvatar: 'http://192.168.1.101:3100/app/avatar/',
  urlSocketCuiQly: "http://192.168.1.254:3400",

  //DEVELOP
  // urlApi: 'https://devgraph.cuiqly.com/',
  urlPage: 'https://dashboard.cuiqly.com/',
  urlApiBackend: 'http://devapibackend.cuiqly.com/',
  urlAssetsPage: 'https://dashboard.cuiqly.com/assets/',
  urlImgsProduct: 'https://dashboard.cuiqly.com/imgs/products/',
  urlImgsFlag: 'https://dashboard.cuiqly.com/imgs/flags/',
  urlImgsChat: 'https://dashboard.cuiqly.com/app/chats/',
  urlAvatar: 'https://dashboard.cuiqly.com/app/avatar/',
  // urlSocketCuiQly: "https://devchat.cuiqly.com/",

  //PRODUCTION
  // urlApi: 'https://graph.cuiqly.com/',
  // urlPage: 'https://control.cuiqly.com/',
  // urlApiBackend: 'http://apibackend.cuiqly.com/',
  // urlAssetsPage: 'https://control.cuiqly.com/assets/',
  // urlImgsProduct: 'https://control.cuiqly.com/imgs/products/',
  // urlImgsFlag: 'https://control.cuiqly.com/imgs/flags/',
  // urlImgsChat: 'https://control.cuiqly.com/app/chats/',
  // urlAvatar: 'https://control.cuiqly.com/app/avatar/',
  // urlSocketCuiQly: "https://chat.cuiqly.com/",
};
