import { combineReducers } from 'redux';

import authReducer from '@app/core/auth/auth.reducers';
import homeReducer from './pages/home/home.reducer';

const appReducer = combineReducers({
  // authReducer,
  homeReducer
});

export default appReducer;
