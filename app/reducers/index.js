import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import CheckLogoReducer from './checkLogo'
import NetInfoReducer from './netInfo'
import AppInfoReducer from './appInfo'
import TokenListReducer from './tokenList'

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  checkLogo: CheckLogoReducer,
  netInfo: NetInfoReducer,
  appInfo: AppInfoReducer,
  tokenList: TokenListReducer,
});
