import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  name: '',
  notices: [],
};

const shop = createSlice({
  // createSlice로 액션 생성함수, 리듀서 둘다 만듬
  name: 'shopReducer',
  initialState,
  reducers: {
    SetShop: (state, action) => {
      console.log(`shop-payload : ${action.payload}`);
      const { _id, name, notices } = action.payload;
      state._id = _id;
      state.name = name;
      state.notices = notices;
    },
  },
});

export const { SetShop } = shop.actions;

export default shop;
