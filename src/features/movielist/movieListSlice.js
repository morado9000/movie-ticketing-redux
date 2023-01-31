import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { theatres } from "../../theaters";

const initialState = {
    movies: [],
    status: 'loading',
    theatres: theatres,
};

export const moviesLoadAsync = createAsyncThunk(
    'movielist/getMoviesByTerm',
    async (key) => {
        let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=' + key + '&language=en-US&page=1');
        let json = await res.json();
        return json;
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
                let temp = [];
                 for(let i=0; i<action.payload.results.length; i++){
                     if(theatres.theatres[i]){
                        temp.push({
                            "id" : i,
                            "title" : action.payload.results[i].title,
                            "poster_path" : 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + action.payload.results[i].poster_path,
                            "theatre" : theatres.theatres[i],
                        })
                     }
                }
                state.movies = temp;
                state.status="idle";
            })
    },
})

export const selectMovies = (state) => state.movielist.movies;
export const selectStatus = (state) => state.movielist.status;

export default movieListSlice.reducer;
