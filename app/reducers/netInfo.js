import * as actionTypes from 'actions/actionTypes';

const initialState = {
  type: '',
  isConnected: true,
  isInternetReachable: true,
  isWifiEnabled: false,
  details: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_DATA_CONNECT:
      return {...state, ...action.connect};
    default:
      return state;
  }
};
