import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
