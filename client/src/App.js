import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "./features/counter/counterSlice";
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import AppContainer from "./containers/AppContainer";
import './App.css'

function App() {
    const { authorized } = useSelector((state) => state.auth);

    const pageHeight = window.overlay === 0 ? window.innerHeight : document.documentElement.clientHeight;

    return (
        <div className="App">
            <Box sx={{ pb: 7, height: 'calc(' + pageHeight + 'px' + ' - 56px)' }}>
                <AppContainer/>
                {authorized && <BottomNav/>}
            </Box>
        </div>
    );
}

export default App;
