import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 초기 상태
  register: {
    email: '',
    name: '',
    password: '',
    passwordCheck: '',
  },
  login: {
    email: '',
    password: '',
  },
};

const auth = createSlice({
  // 액션생성함수 , 리듀서 생성
  name: 'authReducer',
  initialState,
  reducers: {
    ChangeField: (state, action) => {
      const { form, key, value } = action.payload;
      console.log(action.payload);
      state[form][key] = value;
    },
  },
});

export const { ChangeField } = auth.actions;

export default auth;
