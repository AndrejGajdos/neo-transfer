import { call, put, select, takeLatest } from 'redux-saga/effects';
import { wallet, api } from '@cityofzion/neon-js';
import * as ActionTypes from '../constants/actionTypes';

function* transfer(action) {
  try {
    const privateKey = yield select(state => state.access.privateKey);
    yield call(
      api.sendAsset,
      {
        net: 'TestNet',
        account: new wallet.Account(privateKey),
        intents: api.makeIntent(
          {
            [action.currency]: action.amount,
          },
          action.toAddress,
        ),
      },
    );
    yield put({ type: ActionTypes.TRANSFER_SUCCEEDED });
  } catch (error) {
    yield put({ type: ActionTypes.TRANSFER_FAILED, message: error.message });
  }
}

export default function* watchTransfer() {
  yield takeLatest(ActionTypes.TRANSFER_REQUESTED, transfer);
}
