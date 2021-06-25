import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';
import parttime from './parttime';
import render from './render';
import shop from './shop';
import transition from './transition';
import user from './user';
import workManual from './workManual';

const rootReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  shop: shop.reducer,
  workManual: workManual.reducer,
  parttime: parttime.reducer,
  transition: transition.reducer,
  render: render.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
