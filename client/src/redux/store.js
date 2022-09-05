import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authReducer, {getProfile} from '../features/auth/authSlice'
import matchReducer from '../features/match/matchSlice'
import chatReducer from '../features/match/chatSlice'
import thunk from "redux-thunk";
import {getTokens, setAuthToken, setRefreshToken} from "../utils/tokens";

export default function configureAppStore() {
    const store = configureStore({
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(thunk),
        reducer: {
            counter: counterReducer,
            auth: authReducer,
            match: matchReducer,
            chat: chatReducer
        }
    })

    const {accessToken} = getTokens();
    if (accessToken) {
        setAuthToken(accessToken);
        store.dispatch(getProfile());
    }

    return store;
}

