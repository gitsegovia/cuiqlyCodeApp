import * as actionTypes from './actionTypes';

//FUNCTION ACTIONS
const setFinishLogoApp = () => {
  return {
    type: actionTypes.SET_FINISH_LOGO
  };
};

//FUNCTIONS ENABLE
export const onSetFinishLogoApp = () => (dispatch) => {
  dispatch(setFinishLogoApp());
};