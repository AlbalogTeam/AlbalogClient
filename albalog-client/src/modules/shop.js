import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  name: '',
  notices: [],
  workManuals: [],
  address: '',
  phone_number: '',
  postal_code: '',
  employees: [],
};

const shop = createSlice({
  // createSlice로 액션 생성함수, 리듀서 둘다 만듬
  name: 'shopReducer',
  initialState,
  reducers: {
    SetShop: (state, action) => {
      const {
        _id,
        name,
        notices,
        workManuals,
        address,
        phone_number,
        postal_code,
        employees,
      } = action.payload;
      state._id = _id;
      state.name = name;
      state.notices = notices;
      state.workManuals = workManuals;
      state.address = address;
      state.phone_number = phone_number;
      state.postal_code = postal_code;
      state.employees = employees;
    },
    ShopFormField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { SetShop, ShopFormField } = shop.actions;

export default shop;
