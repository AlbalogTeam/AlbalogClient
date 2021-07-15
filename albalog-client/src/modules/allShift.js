import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allShift: [],
};

const allShift = createSlice({
  name: 'allShiftReducer',
  initialState,
  reducers: {
    SetAllShift: (state, action) => {
      state.allShift = action.payload;
    },
  },
});

export const { SetAllShift } = allShift.actions;
export default allShift;
