import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';
import shop from './shop';
import user from './user';
import workManual from './workManual';

const rootReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  shop: shop.reducer,
  workManual: workManual.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
