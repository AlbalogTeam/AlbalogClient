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
        store,
        birthdate,
        wage,
        gender,
        shift,
        timeclock,
        status,
        cellphone,
      } = action.payload;

      state.store = store;
      state.birthdate = birthdate;
      state.wage = wage;
      state.gender = gender;
      state.shift = shift;
      state.timeclock = timeclock;
      state.status = status;
      state.cellphone = cellphone;
    },
  },
});

export const { SetParttime } = parttime.actions;
export default parttime;
