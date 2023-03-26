import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginUser: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            if(action.payload.username == process.env.REACT_APP_MOVIE_USER && action.payload.password == process.env.REACT_APP_MOVIE_PASSWORD){
                state.loginUser = process.env.REACT_APP_MOVIE_USER;
            }
        },
        logout: (state) => {
            state.loginUser = null;
        }
    }
})


export const selectLoginUser = (state) => state.auth.loginUser;

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;