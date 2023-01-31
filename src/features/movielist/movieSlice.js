import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { theatres } from "../../theaters";

const initialMovieState =  {
    movie: [],
    theatre: null,
}

export const movieBuildAsync = createAsyncThunk(
    'movie/getMovie',
    async (mov) => {

    }
)

export const movieSlice = createSlice({
    name: "movie",
    initialMovieState,
    reducers: {
        loadMovie: (state, action) => {
            state.movie = action.payload;
            for(let i=0; i<theatres.length; i++){
                for(let j=0; j<theatres[i].showtimes.length; j++){
                    if(theatres[i].showtimes[j].availiablity == "availiable"){
                        state.theatre.push(theatres[i].showtimes[j]);
                        theatres[i].showtimes[j].availiablity = "unavailiable";
                        break;
                    }
                }
            }
        }
    },

    extraReducers: (builder) => {

    }
})