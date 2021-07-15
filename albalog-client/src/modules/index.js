import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import auth from './auth';
import { dateSaga } from './date';
import parttime from './parttime';
import render from './render';
import shop from './shop';
import transition from './transition';
import user from './user';
import workManual from './workManual';
import date from './date';
import allShift from './allShift';

const rootReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  shop: shop.reducer,
  workManual: workManual.reducer,
  parttime: parttime.reducer,
  transition: transition.reducer,
  render: render.reducer,
  allShift: allShift.reducer,
  date,
});

export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([dateSaga()]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export default store;
