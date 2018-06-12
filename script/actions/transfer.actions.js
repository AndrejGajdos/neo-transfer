import * as ActionTypes from '../constants/actionTypes';

const transfer = (toAddress, amount, currency) => ({
  type: ActionTypes.TRANSFER_REQUESTED,
  toAddress,
  amount,
  currency,
});

export default transfer;
