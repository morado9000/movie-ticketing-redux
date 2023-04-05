import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieAPI, getMoviesByDateAPI } from "../../utils";

const initialState = {
    movies: [],
    status: 'loading',
};

export const moviesLoadAsync = createAsyncThunk(
    'movielist/getMoviesByTerm',
    async () => {
        return getMovieAPI();
    }
)

export const moviesDateLoadAsync = createAsyncThunk(
    'movielist/getMoviesByDate',
    async (date) => {
        return getMoviesByDateAPI(date);
    }
)

export const movieListSlice = createSlice({
    name: 'movielist',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(moviesLoadAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(moviesLoadAsync.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.status="idle";
            })
            .addCase(moviesDateLoadAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(moviesDateLoadAsync.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.status="idle";
            })
    },
})

export const selectMovies = (state) => state.movielist.movies;
export const selectStatus = (state) => state.movielist.status;

export default movieListSlice.reducer;
