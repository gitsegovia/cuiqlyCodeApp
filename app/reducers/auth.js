import * as actionTypes from '@actions/actionTypes';
const initialState = {
  login: {
    success: false,
    token: '',
    userId: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    avatar: '',
    coins: 0,
    saving: 0,
    verifiedPhone: false,
    gender: '',
    invited: false,
    numberClient: '',
    referalCode: '',
    countCoupons: 0,
    amountCoupons: 0,
    referenceCode: '',
    couponDateExp: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      return {
        ...state,
        register: {...state.register, ...action.data},
      };
    case actionTypes.DELETE_REGISTER:
      return {
        ...state,
        register: initialState.register,
      };
    case actionTypes.LOGIN:  
    return {
        ...state,
        login: {...state.login, success: true, userId: action.data.id},
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };
    case actionTypes.LOGIN_SUCCESS:
      
    const newState = {
        ...state,
        login: {
          ...state.login,
          token: action.data.token,
          success: true,
          userId: action.data.userId,
          clientId: action.data.clientId,
          email: action.data.email,
          invited: false,
          firstName: action.data.Client.firstName,
          lastName: action.data.Client.lastName,
          avatar: action.data.Client.photo,
        },
      };
      return newState;
    case actionTypes.LOGIN_INVITED:
      return {
        ...state,
        login: {
          ...initialState,
          success: true,
          invited: true,
        },
      };
    case actionTypes.DATA_USER:
      console.error('data--', action.data);
      return {
        ...state,
        login: {
          ...state.login,
          email: action.data.email,
          phone: action.data.phoneNumber,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          avatar: action.data.avatar,
          coins: action.data.coins,
          saving: action.data.saving,
          gender: action.data.gender,
          verifiedPhone: action.data.verifiedPhone,
          numberClient: action.data.numberClient,
          countCoupons: action.data.countCoupons,
          amountCoupons: action.data.amountCoupons,
          couponDateExp: action.data.couponDateExp,
          referenceCode: action.data.referenceCode,
        },
      };
    case actionTypes.DATA_USER_PROFILE:
      return {
        ...state,
        login: {
          ...state.login,
          phone: action.data.phoneNumber,
          avatar: action.data.photo,
          gender: action.data.gender,
        },
      };
    case actionTypes.SAVE_ALL_CREDICT_CARD:
      const defaultCard = action.data.find(({primary}) => primary === true);
      return {
        ...state,
        creditCard: action.data,
        defaultCard: defaultCard,
      };
    case actionTypes.SET_DEFAULT_CARD:
      const localState = state.creditCard.map(c => {
        if (c.primary === true) c.primary = false;

        if (action.data !== undefined && c.id === action.data.id)
          c.primary = true;
        return c;
      });

      const dCard = localState.find(({id}) => id === action.data.id);

      return {
        ...state,
        creditCard: localState,
        defaultCard: dCard,
      };
    case actionTypes.CHAT_STATUS:
      return {
        ...state,
        chatStatus: action.data,
      };
    case actionTypes.OPEN_CHAT:
      return {
        ...state,
        chatStatus: {
          ...state.chatStatus,
          openChat: true,
        },
      };
    case actionTypes.SET_COIN_BALANCE:
      return {
        ...state,
        login: {
          ...state.login,
          coins: action.data,
        },
      };
    case actionTypes.CHANGE_TO_READ:
      return {
        ...state,
        chatStatus: {...state.chatStatus, read: false},
      };
    case actionTypes.SET_USED_COUPON:
      return {
        ...state,
        login: {
          ...state.login,
          countCoupons: 0,
          amountCoupons: 0,
          couponDateExp: '',
        },
      };
    default:
      return state;
  }
};
