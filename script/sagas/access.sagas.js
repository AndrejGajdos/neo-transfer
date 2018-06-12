import { call, put, takeLatest } from 'redux-saga/effects';
import { wallet } from '@cityofzion/neon-js';
import getBalance from 'actions/balance.actions';
import * as ActionTypes from '../constants/actionTypes';

function* login(action) {
  const { privateKey } = action;
  try {
    const account = new wallet.Account(privateKey);
    yield put(getBalance(account.address));
    yield put({ type: ActionTypes.LOGIN_SUCCEEDED, address: account.address, privateKey });
  } catch (error) {
    yield put({ type: ActionTypes.LOGIN_FAILED, message: error.message });
  }
}

export function* watchLogin() {
  yield takeLatest(ActionTypes.LOGIN_REQUESTED, login);
}

function* logout() {
  try {
    yield put({ type: ActionTypes.LOGOUT_SUCCEEDED });
  } catch (error) {
    yield put({ type: ActionTypes.LOGOUT_FAILED, message: error.message });
  }
}

export function* watchLogout() {
  yield takeLatest(ActionTypes.LOGOUT_REQUESTED, logout);
}
