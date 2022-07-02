import * as actionTypes from './actionTypes';

//FUNCTION ACTIONS
const setTokenListValidate = (data) => {
  return {
    type: actionTypes.SET_TOKENLIST_VALIDATE,
    data,
  };
};
const setTokenListRefresh = (data) => {
  return {
    type: actionTypes.SET_TOKENLIST_REFRESH,
    data,
  };
};

//FUNCTIONS ENABLE
export const onSetTokenListValidate = (value) => (dispatch) => {
  dispatch(setTokenListValidate(value));
};

export const onSetTokenListRefreshe = (value) => (dispatch) => {
  dispatch(setTokenListRefresh(value));
};