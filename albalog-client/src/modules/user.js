import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  email: '',
  name: '',
  role: '',
  token: '',
};

const user = createSlice({
  // createSlice로 액션생성함수 , 리듀서 둘다 만듬
  name: 'userReducer',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      const { _id, email, name, role, token } = action.payload;
      state._id = _id;
      state.email = email;
      state.name = name;
      state.role = role;
      state.token = token;
    },
    UserStateEmpty: () => initialState,
  },
});

export const { SetUser, UserStateEmpty } = user.actions;

export default user;
