import * as actionTypes from 'actions/actionTypes';
const initialState = {
  login: {
    success: false,
    userId: '',
    nameUser: '',
    codeUser: '',
    numberUser: '',
    token: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {    
    case actionTypes.LOGIN: 
      return {
        login: {
          ...state.login, 
          success: true, 
          userId: action.data.id,
          nameUser: action.data.nameUser,
          codeUser: action.data.codeUser,
          numberUser: action.data.numberUser,
          token: action.data.token,
        },
      };
    case actionTypes.LOGIN_TOKEN:  
      return {
        login: {
          ...state.login, 
          token: action.data,
        },
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };    
    default:
      return state;
  }
};

