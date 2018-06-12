import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '@cityofzion/neon-js';
import delay from 'utils/utils';
import * as ActionTypes from '../constants/actionTypes';

function* getBalance(action) {
  while (true) {
    const { address } = action;
    try {
      const { assets } = yield call(
        api.neoscan.getBalance,
        'TestNet',
        address,
      );
      yield put({ type: ActionTypes.BALANCE_SUCCEEDED, assets });
    } catch (error) {
      yield put({ type: ActionTypes.BALANCE_FAILED, message: error.message });
    }
    yield delay(1000);
  }
}

export default function* watchBalance() {
  yield takeLatest(ActionTypes.BALANCE_REQUESTED, getBalance);
}
