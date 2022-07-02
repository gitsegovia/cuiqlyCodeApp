import * as actionTypes from './actionTypes';

const updateDataConnect = (connect) => {
  return {
    type: actionTypes.UPDATE_DATA_CONNECT,
    connect,
  };
};

export const onUpdateDataConnect = (connect) => (dispatch) => {
  dispatch(updateDataConnect(connect));
};
