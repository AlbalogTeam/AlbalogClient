import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: [],
  birthdate: '',
  hourly_wage: '',
  gender: '',
  shifts: [],
  payrolls: [],
  timeClocks: [],
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
        hourly_wage,
        gender,
        shifts,
        payrolls,
        timeClocks,
        status,
        cellphone,
      } = action.payload;

      state.stores = stores;
      state.birthdate = birthdate;
      state.hourly_wage = hourly_wage;
      state.gender = gender;
      state.shifts = shifts;
      state.payrolls = payrolls;
      state.timeClocks = timeClocks;
      state.status = status;
      state.cellphone = cellphone;
    },
  },
});

export const { SetParttime } = parttime.actions;
export default parttime;
