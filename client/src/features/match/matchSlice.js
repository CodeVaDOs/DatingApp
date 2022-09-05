import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authSlice, getProfile} from "../auth/authSlice";
import {api} from "../../service/API";

const initialState = {
    users: [],
}
export const getSuggestions = createAsyncThunk(
    'match/suggestions',
    async (data, thunkAPI) => {
        return await api.get('user/suggestions');
    }
)

export const gradeUser = createAsyncThunk(
    'match/grade',
    async (data, thunkAPI) => {
        const {gradeType, userReceived} = data;
        return await api.post('grade', {gradeType: gradeType === 'left' ? "DISLIKE" : "LIKE", userReceived});
    }
)

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        slide: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestions.fulfilled, (state, action) => {
                state.users = [...action.payload.filter(u => !state.users.some(ou => ou.id === u.id)), ...state.users]
                console.log(state.users)
            })
            .addCase(gradeUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u.id !== action.payload.userReceived)
            })
    }
})

export const {slide} = matchSlice.actions;
export default matchSlice.reducer