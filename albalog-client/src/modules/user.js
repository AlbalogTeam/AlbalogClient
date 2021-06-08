import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  email: '',
  name: '',
  role: '',
};

const user = createSlice({
  // createSlice로 액션생성함수 , 리듀서 둘다 만듬
  name: 'userReducer',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      console.log(`payload : ${action.payload}`);
      const { _id, email, name, role } = action.payload;
      state._id = _id;
      state.email = email;
      state.name = name;
      state.role = role;
    },
  },
});

export const { SetUser } = user.actions;

export default user;
