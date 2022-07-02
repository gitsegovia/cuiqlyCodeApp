import * as actionTypes from 'actions/actionTypes';

const initialState = {
  tokenDevice: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_INFO_DEVICE:
      return {
        tokenDevice: action.data
      };
    default:
      return state;
  }
};
