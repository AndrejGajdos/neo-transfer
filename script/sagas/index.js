import { all, fork } from 'redux-saga/effects';
import { watchLogin, watchLogout } from './access.sagas';
import watchBalance from './balance.sagas';
import watchTransfer from './transfer.sagas';

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchBalance),
    fork(watchTransfer),
  ]);
}

