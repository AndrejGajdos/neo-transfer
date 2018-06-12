import * as ActionTypes from '../constants/actionTypes';

const transfer = (state = {
  success: null,
  error: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.TRANSFER_FAILED: {
      return {
        error: {
          message: action.message,
        },
      };
    }
    case ActionTypes.TRANSFER_SUCCEEDED: {
      return {
        success: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.',
      };
    }
    default:
      return state;
  }
};

export default transfer;
