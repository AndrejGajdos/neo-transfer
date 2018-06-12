import * as ActionTypes from '../constants/actionTypes';

const getBalance = address => ({
  type: ActionTypes.BALANCE_REQUESTED,
  address,
});

export default getBalance;
