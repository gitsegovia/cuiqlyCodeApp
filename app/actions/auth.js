import * as actionTypes from './actionTypes';

//FUNCTION ACTIONS
const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

const loginToken = data => {
  return {
    type: actionTypes.LOGIN_TOKEN,
    data
  }
}

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
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

export const onLoginToken = data => dispatch => {
  dispatch(loginToken(data));
};

export const osSaveUser = data => dispatch => {
  dispatch(saveUser(data));
};

export const onLoginInvited = () => dispatch => {
  dispatch(loginInvited());
};

export const onLogout = () => dispatch => {
  dispatch(logout());
};