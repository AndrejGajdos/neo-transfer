import * as ActionTypes from '../constants/actionTypes';

export const login = privateKey => ({
  type: ActionTypes.LOGIN_REQUESTED,
  privateKey,
});

export const logout = () => ({
  type: ActionTypes.LOGOUT_REQUESTED,
});
