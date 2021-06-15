import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  category_id: '',
  title: '',
  content: '',
};

const workManual = createSlice({
  // createSlice로 액션생성함수 , 리듀서 둘다 만듬
  name: 'workManualReducer',
  initialState,
  reducers: {
    setWorkManual: (state, action) => {
      const { _id, category_id, title, content } = action.payload;
      state._id = _id;
      state.category_id = category_id;
      state.title = title;
      state.content = content;
    },
  },
});

export const { setWorkManual } = workManual.actions;

export default workManual;
