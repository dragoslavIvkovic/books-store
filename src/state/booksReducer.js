/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'books',
  initialState: {
    bookId: 13,
    mode:'edit'
  },
  reducers: {
    addBookState: (state, action) => {
      // Use immer's 'draft' to update the state without directly mutating it
      state.bookId = action.payload;
    },
    setMode: (state, action) => {
      // Use immer's 'draft' to update the state without directly mutating it
      state.mode = action.payload;
    }
  }
});

export const { addBookState, setMode } = counterSlice.actions;
export const selectBookId = (state) => state.books.bookId;

export default counterSlice.reducer;
