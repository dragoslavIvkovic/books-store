import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksReducer';

export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
