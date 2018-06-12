import { BigNumber } from 'bignumber.js';
import * as ActionTypes from '../constants/actionTypes';

const balance = (
  state = {
    NEO: 0,
    GAS: 0,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.BALANCE_SUCCEEDED: {
      const neo = new BigNumber();
      neo.c = action.assets.NEO.balance.c;
      neo.e = action.assets.NEO.balance.e;
      neo.s = action.assets.NEO.balance.s;
      neo.decimalPlaces(5);
      const gas = new BigNumber();
      gas.c = action.assets.GAS.balance.c;
      gas.e = action.assets.GAS.balance.e;
      gas.s = action.assets.GAS.balance.s;
      gas.decimalPlaces(5);
      return {
        NEO: neo.toString(),
        GAS: gas.toString(),
      };
    }
    default:
      return state;
  }
};

export default balance;
