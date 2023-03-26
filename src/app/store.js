import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movielist/movieListSlice';
import authReducer from '../features/admin/authSlice';

export const store = configureStore({
  reducer: {
    movielist: movieReducer,
    auth: authReducer
  },
});
