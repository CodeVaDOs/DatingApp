import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import DatingCardContainer from "../components/DatingCardContainer";
import {Box} from "@mui/material";
import Header from "../components/Header";

const HomePage = () => {
    // const value = useSelector(state => state.counter.value);
    // const dispatch = useDispatch();

    return (
        <>
            <Header/>
            <Box className="datingCardContainer page-container" sx={{height: 'calc(100% - 64px - 56px)'}} display="flex" justifyContent="center" alignItems="center">
                <DatingCardContainer/>
            </Box>
        </>
    );
};

export default HomePage;