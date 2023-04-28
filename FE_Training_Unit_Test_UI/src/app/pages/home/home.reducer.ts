import { createReducer } from '@app/core/helpers/reducer-factory';
import ACTION_TYPES from '@app/core/constants/types';

const initialState = {
  isLoading: false,
  hasError: false,
  dataList: null,
	dataUser: null,
  error: null,
};

const getListUser = (state) => ({
  ...state,
  isLoading: true,
  hasError: false,
  error: null
});

const getListUserSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  dataList: payload.data
});

const getListUserError = (state, payload) => ({
  ...state,
  isLoading: false,
	dataUser: null,
  hasError: true,
  error: payload.error,
});

const getUserInfo = (state) => ({
	...state,
	isLoading: true,
	hasError: false,
	error: null
});

const getUserInfoSuccess = (state, payload) => ({
	...state,
	isLoading: false,
	dataUser: payload.data
});
  
const getUserInfoError = (state, payload) => ({
	...state,
	isLoading: false,
	hasError: true,
	error: payload.error,
});

const deleteUser = (state, payload) => ({
	...state,
	dataList: state.dataList.filter(item => item.id !== payload.id),
	isLoading: false,
	hasError: true,
	error: payload.error,
});

const strategies = {
	[ACTION_TYPES.GET_LIST_USER]: getListUser,
	[ACTION_TYPES.GET_LIST_USER_SUCCESS]: getListUserSuccess,
	[ACTION_TYPES.GET_LIST_USER_ERROR]: getListUserError,
	[ACTION_TYPES.GET_USER_INFO]: getUserInfo,
	[ACTION_TYPES.GET_USER_INFO_SUCCESS]: getUserInfoSuccess,
	[ACTION_TYPES.GET_USER_INFO_ERROR]: getUserInfoError,
	[ACTION_TYPES.DELETE_USER]: deleteUser,
  __default__: state => state
};

const homeReducer = createReducer(strategies, initialState);
  
export default homeReducer;
