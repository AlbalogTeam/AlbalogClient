import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  date: '',
  completed: false,
  description: '',
};

const transition = createSlice({
  name: 'transitionReducer',
  initialState,
  reducers: {
    setTransition: (state, action) => {
      const { _id, date, completed, description } = action.payload;
      state._id = _id;
      state.date = date;
      state.completed = completed;
      state.description = description;
    },
  },
});

export const { setTransition } = transition.actions;

export default transition;
