import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  render: false,
};

const render = createSlice({
  name: 'renderReducer',
  initialState,
  reducers: {
    reRender: (state, action) => {
      state.render = action.payload;
    },
  },
});

export const { reRender } = render.actions;

export default render;
