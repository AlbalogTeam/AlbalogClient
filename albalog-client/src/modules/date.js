import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getMonthDataAPI } from 'utils/api/date';

// 액션 타입 정의
const GET_MONTH_DATA = 'date/GET_MONTH_DATA';
const GET_MONTH_DATA_SUCCESS = 'date/GET_MONTH_SUCCESS';
const GET_PREV_MONTH = 'date/GET_PREV_MONTH';
const GET_PREV_MONTH_SUCCESS = 'date/GET_PREV_MONTH_SUCCESS';
const GET_PREV_MONTH_FAILURE = 'date/GET_PREV_MONTH_FAILURE';
const GET_NEXT_MONTH = 'date/GET_NEXT_MONTH';
const GET_NEXT_MONTH_SUCCESS = 'date/GET_NEXT_MONTH_SUCCESS';

// 액션 생성 함수 정의
export const getMonthData = createAction(GET_MONTH_DATA);
export const getPrevMonth = createAction(GET_PREV_MONTH);
export const getNextMonth = createAction(GET_NEXT_MONTH);

export function* dateSaga() {
  yield takeLatest(GET_MONTH_DATA, getMonthSaga);
  yield takeLatest(GET_PREV_MONTH, getPrevMonthSaga);
  yield takeLatest(GET_NEXT_MONTH, getNextMonthSaga);
}

export function* getMonthSaga(action) {
  // 날짜 설정
  let { year, month, shopId } = action.payload;

  try {
    const response = yield call(getMonthDataAPI, { year, month, shopId });
    yield put({
      type: GET_MONTH_DATA_SUCCESS,
      payload: { year, month, response },
    });
  } catch (e) {
    console.log(e);
  }
}

export function* getPrevMonthSaga(action) {
  // 날짜 설정
  let { year, month, shopId } = action.payload;
  if (month === 1) {
    year -= 1;
    month = 12;
  } else {
    month -= 1;
  }
  try {
    const response = yield call(getMonthDataAPI, { year, month, shopId });
    yield put({
      type: GET_PREV_MONTH_SUCCESS,
      payload: { year, month, response },
    });
  } catch (e) {
    console.log(e);
  }
}

export function* getNextMonthSaga(action) {
  let { year, month, shopId } = action.payload;
  if (month === 12) {
    year += 1;
    month = 1;
  } else {
    month += 1;
  }
  try {
    const response = yield call(getMonthDataAPI, { year, month, shopId });
    yield put({
      type: GET_NEXT_MONTH_SUCCESS,
      payload: { year, month, response },
    });
  } catch (e) {
    console.log(e);
  }
}

const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  payrollData: [],
};

const date = createReducer(initialState, {
  [GET_MONTH_DATA]: (state, action) => ({
    ...state,
  }),
  [GET_MONTH_DATA_SUCCESS]: (state, action) => ({
    ...state,
    year: action.payload.year,
    month: action.payload.month,
    payrollData: action.payload.response,
  }),
  [GET_PREV_MONTH]: (state, action) => ({
    ...state,
  }),
  [GET_PREV_MONTH_SUCCESS]: (state, action) => ({
    ...state,
    year: action.payload.year,
    month: action.payload.month,
    payrollData: action.payload.response,
  }),

  [GET_NEXT_MONTH]: (state, action) => ({
    ...state,
  }),
  [GET_NEXT_MONTH_SUCCESS]: (state, action) => ({
    ...state,
    year: action.payload.year,
    month: action.payload.month,
    payrollData: action.payload.response,
  }),
});

export default date;
