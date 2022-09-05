import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../service/API";

const initialState = {
    chatRooms: [],
    matches: [],
    currentChat: null
}

export const getMatches = createAsyncThunk(
    'chat/matches',
    async (data, thunkAPI) => {
        return await api.get('user/matches');
    }
)

export const getChatRooms = createAsyncThunk(
    'chat/rooms',
    async (data, thunkAPI) => {
        return await api.get('chat');
    }
)

export const createChat = createAsyncThunk(
    'chat/create',
    async (data, thunkAPI) => {
        return await api.post('chat', {
            userId: data.userId,
        });
    }
)

export const getCurrentChat = createAsyncThunk(
    'chat/getCurrent',
    async (data, thunkAPI) => {
        return await api.get('chat/' + data.id);
    }
)

export const createMessage = createAsyncThunk(
    'chat/createMessage',
    async (data, thunkAPI) => {
        return await api.post('chat/' + data.id, {
            body: data.body
        });
    }
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChat.fulfilled, (state, action) => {
                state.matches = state.matches.filter(m => m.id !== action.payload.userList[0].id)
                state.chatRooms = [action.payload, ...state.chatRooms]
            })
            .addCase(getMatches.fulfilled, (state, action) => {
                state.matches = action.payload
            })
            .addCase(getCurrentChat.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(getChatRooms.fulfilled, (state, action) => {
                state.chatRooms = action.payload;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.currentChat.messageList.push(action.payload)
            })
    }
})

export const {slide} = chatSlice.actions;
export default chatSlice.reducer