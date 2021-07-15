import * as actionTypes from './actionTypes';

//FUNCTION ACTIONS
const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const register = data => {
  return {
    type: actionTypes.REGISTER,
    data,
  };
};

const deleteRegister = () => {
  return {
    type: actionTypes.DELETE_REGISTER,
  };
};

const saveAllCreditCard = data => {
  return {
    type: actionTypes.SAVE_ALL_CREDICT_CARD,
    data,
  };
};

const defaultCard = data => {
  return {
    type: actionTypes.SET_DEFAULT_CARD,
    data,
  };
};

const saveUser = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
};

const loginInvited = () => {
  return {
    type: actionTypes.LOGIN_INVITED,
  };
};

const dataUser = data => {
  return {
    type: actionTypes.DATA_USER,
    data,
  };
};

const dataUserProfile = data => {
  return {
    type: actionTypes.DATA_USER_PROFILE,
    data,
  };
};

const chatStatus = data => {
  return {
    type: actionTypes.CHAT_STATUS,
    data,
  };
};

const openChat = () => {
  return {
    type: actionTypes.OPEN_CHAT,
  };
};

const changeToRead = () => {
  return {
    type: actionTypes.CHANGE_TO_READ,
  };
};

const coinBalance = data => {
  return {
    type: actionTypes.SET_COIN_BALANCE,
    data,
  };
};

const usedCoupon = () => {
  return {
    type: actionTypes.SET_USED_COUPON,
  };
};
//FUNCTIONS ENABLE
export const authentication = (login, callback) => dispatch => {
  //call api and dispatch action case
  setTimeout(() => {
    let data = {
      success: login,
      userId: '',
    };
    dispatch(loginSuccess(data));
    if (typeof callback === 'function') {
      callback({success: true});
    }
  }, 500);
};

export const onLogin = data => dispatch => {
  dispatch(loginSuccess(data));
};

export const osSaveUser = data => dispatch => {
  dispatch(saveUser(data));
};

export const onLoginInvited = () => dispatch => {
  dispatch(loginInvited());
};

export const onDataUser = data => dispatch => {
  dispatch(dataUser(data));
};

export const onDataUserProfile = data => dispatch => {
  dispatch(dataUserProfile(data));
};

export const onLogout = () => dispatch => {
  dispatch(logout());
};

export const onRegisterUser = data => dispatch => {
  dispatch(register(data));
};

export const onDeleteRegisterUser = () => dispatch => {
  dispatch(deleteRegister());
};

export const onSaveAllCreditCard = data => dispatch => {
  dispatch(saveAllCreditCard(data));
};

export const setDefaultCard = data => dispatch => {
  dispatch(defaultCard(data));
};

export const setChatStatus = data => dispatch => {
  dispatch(chatStatus(data));
};

export const setOpenChat = () => dispatch => {
  dispatch(openChat());
};

export const setChatToRead = () => dispatch => {
  dispatch(changeToRead());
};

export const setCoinBalance = data => dispatch => {
  dispatch(coinBalance(data));
};

export const setUsedCoupon = () => dispatch => {
  dispatch(usedCoupon());
};
