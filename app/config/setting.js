/**
 * Basic Setting Variables Define
 */
const dev = process.env.NODE_ENV === `development`;
//LOCAL - PRODUCTION - DEVELOPMENT
const nodeEnv = 'DEVELOPMENT';

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
  
  //URL MANAGERS
  urlApi: nodeEnv==='LOCAL' ? 'http://192.168.1.193:5000/' : nodeEnv==='PRODUCTION' ? 'https://genesys.cuiqly.com/' : 'https://demo.genesys.cuiqly.com/',
  urlApiBackend: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3001/' : nodeEnv==='PRODUCTION' ? 'http://filegenius.cuiqly.com/' : 'https://demo.filegenius.cuiqly.com/',
  urlPage: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/' : 'https://demo.nexus.cuiqly.com/',
  urlAssetsPage: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/assets/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/assets/' : 'https://demo.nexus.cuiqly.com/assets/',
  urlImgsProduct: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/imgs/products/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/imgs/products/' : 'https://demo.nexus.cuiqly.com/imgs/products/',
  urlImgsFlag: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/imgs/flags/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/imgs/flags/' : 'https://demo.nexus.cuiqly.com/imgs/flags/',
  urlImgsChat: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/app/chats/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/app/chats/' : 'https://demo.nexus.cuiqly.com/app/chats/',
  urlAvatar: nodeEnv==='LOCAL' ? 'http://192.168.1.193:3100/app/avatar/' : nodeEnv==='PRODUCTION' ? 'https://nexus.cuiqly.com/app/avatar/' : 'https://demo.nexus.cuiqly.com/app/avatar/',
  urlSocketCuiQly: nodeEnv==='LOCAL' ? "http://192.168.1.193:3400/" : nodeEnv==='PRODUCTION' ? "https://pulse.cuiqly.com/" : 'https://demo.pulse.cuiqly.com/',

};
