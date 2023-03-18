import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieAPI } from "../../utils";

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

export const movieListSlice = createSlice({
    name: 'movielist',
    initialState,

    reducers: {
        loadMovie: (state, action) => {
            let temp = [];
            for(let i=0; i<action.payload.length; i++){
                temp.push({
                    "title" : action.payload[i].title,
                    "poster_path" : 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + action.payload[i].poster_path
                })
            }
            state.movies = temp;
            state.status="idle";
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(moviesLoadAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(moviesLoadAsync.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.status="idle";
            })
    },
})

export const selectMovies = (state) => state.movielist.movies;
export const selectStatus = (state) => state.movielist.status;

export default movieListSlice.reducer;
