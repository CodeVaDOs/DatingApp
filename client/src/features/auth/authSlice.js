import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../service/API";
import {getTokens, setAuthToken, setRefreshToken} from "../../utils/tokens";

const initialState = {
    authorized: Boolean(localStorage.getItem('authToken')),
    user: null,
    loading: false
}

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        const result =  await api.post('auth/login', data);
        const {token, refreshToken} = result;
        setAuthToken(token);
        setRefreshToken(refreshToken);

        thunkAPI.dispatch(getProfile());
        return result;
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        const result = await api.post('auth/register', data);
        const {token, refreshToken} = result;
        setAuthToken(token);
        setRefreshToken(refreshToken);

        thunkAPI.dispatch(getProfile());
        return result;
    }
)

export const getProfile = createAsyncThunk(
    'auth/profile',
    async (data, thunkAPI) => {
        return await api.get('user/profile');
    }
)

export const putProfile = createAsyncThunk(
    'user/profileUpdate',
    async (data, thunkAPI) => {
        return await api.put('user', {
            ...data
        });
    }
)

export const putAvatar = createAsyncThunk(
    'user/avatarUpdate',
    async (data, thunkAPI) => {
        return await api.put('user/avatar', {
            ...data
        });
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.authorized = false;
            state.user = null;
            setAuthToken();
            setRefreshToken();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.authorized = true;
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(putProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(putAvatar.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
