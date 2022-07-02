import * as actionTypes from 'actions/actionTypes';

const initialState = {
  finishLogo: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_FINISH_LOGO:
      return {
        ...state,
        finishLogo: true,
      };
    default:
      return state;
  }
};
