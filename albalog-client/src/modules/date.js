import { createAction, createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getMonthDataAPI } from 'utils/api/date';

// 액션 타입 정의
const GET_MONTH_DATA = 'date/GET_MONTH_DATA';
const GET_MONTH_DATA_SUCCESS = 'date/GET_MONTH_SUCCESS';

// 액션 생성 함수 정의
export const getMonthData = createAction(GET_MONTH_DATA);

export function* dateSaga() {
  yield takeLatest(GET_MONTH_DATA, getMonthSaga);
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

const initialState = {
  payrollData: [],
};

const date = createReducer(initialState, {
  [GET_MONTH_DATA]: (state, action) => ({
    ...state,
  }),
  [GET_MONTH_DATA_SUCCESS]: (state, action) => ({
    ...state,
    payrollData: action.payload.response,
  }),
});

export default date;
