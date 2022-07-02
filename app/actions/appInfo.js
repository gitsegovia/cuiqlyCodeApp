import * as actionTypes from './actionTypes';

//FUNCTION ACTIONS
const setInfoDevice = (data) => {
  return {
    type: actionTypes.SET_INFO_DEVICE,
    data,
  };
};

//FUNCTIONS ENABLE
export const onSetInfoDevice = (device) => (dispatch) => {
  dispatch(setInfoDevice(device));
};