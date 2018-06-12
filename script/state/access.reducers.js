import * as ActionTypes from '../constants/actionTypes';

const access = (state = {
  address: '',
  privateKey: '',
  error: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCEEDED: {
      return {
        address: action.address,
        privateKey: action.privateKey,
        error: null,
      };
    }
    case ActionTypes.LOGOUT_SUCCEEDED: {
      return {
        address: '',
        privateKey: '',
        error: null,
      };
    }
    case ActionTypes.LOGIN_FAILED: {
      return {
        error: {
          message: action.message,
        },
      };
    }
    case ActionTypes.LOGOUT_FAILED: {
      return {
        ...state,
        error: action.message,
      };
    }
    default:
      return state;
  }
};

export default access;
