import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  store: [],
  birthdate: '',
  wage: '',
  gender: '',
  shift: [],
  timeclock: [],
  status: '',
  cellphone: '',
};

const parttime = createSlice({
  name: 'parttimeReducer',
  initialState,
  reducers: {
    SetParttime: (state, action) => {
      const {
        stores,
        birthdate,
        wage,
        gender,
        shifts,
        timeClocks,
        status,
        cellphone,
      } = action.payload;

      state.store = stores;
      state.birthdate = birthdate;
      state.wage = wage;
      state.gender = gender;
      state.shift = shifts;
      state.timeclock = timeClocks;
      state.status = status;
      state.cellphone = cellphone;
    },
  },
});

export const { SetParttime } = parttime.actions;
export default parttime;
