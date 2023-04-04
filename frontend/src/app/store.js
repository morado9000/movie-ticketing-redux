import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movielist/movieListSlice';

export const store = configureStore({
  reducer: {
    movielist: movieReducer,
  },
});
