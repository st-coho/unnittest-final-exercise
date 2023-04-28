import { ApiService } from '@app/core/services/api.service';
import ACTION_TYPES from '@app/core/constants/types';
import { getListUserError, getListUserSuccess, getUserInfoError, getUserInfoSuccess } from './home.action';
import { put, takeLatest } from 'redux-saga/effects';

const http = new ApiService();
// eslint-disable-next-line func-style
function* workGetListUser() {
  try {
    const res = yield http.get(['https://jsonplaceholder.typicode.com/users']);
    yield put(getListUserSuccess(res));
  } catch (error) {
    yield put(getListUserError(error));
  }
}

// eslint-disable-next-line func-style
function* getUserInfo({ payload }) {
  try {
    const res = yield http.get([`https://jsonplaceholder.typicode.com/users/${payload.id}`]);
    yield put(getUserInfoSuccess(res));
  } catch (error) {
    yield put(getUserInfoError(error));
  }
}

// eslint-disable-next-line func-style
export function* watchGetUser() {
  yield takeLatest(ACTION_TYPES.GET_LIST_USER, workGetListUser);
  yield takeLatest(ACTION_TYPES.GET_USER_INFO, getUserInfo);
}
