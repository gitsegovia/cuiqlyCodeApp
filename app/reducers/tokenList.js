import * as actionTypes from 'actions/actionTypes';

const initialState = {
  validate: false,
  refresh: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_TOKENLIST_VALIDATE:
      return {
        ...state,
        validate: action.data
      };
    case actionTypes.SET_TOKENLIST_REFRESH:
      return {
        validate: false,
        refresh: action.data
      };
    default:
      return state;
  }
};
