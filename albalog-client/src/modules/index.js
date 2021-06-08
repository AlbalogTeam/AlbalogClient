import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth: auth.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
