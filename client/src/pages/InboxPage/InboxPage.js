import React from 'react';
import {Container, Typography} from "@mui/material";
import styled from "@emotion/styled";
import MatchesContainer from "./components/MatchesContainer";
import ChatRoomsContainer from "./components/ChatRoomsContainer";
import {useSelector} from "react-redux";

export const SectionTitle = styled(Typography)`
    margin-bottom: 10px;
    margin-top: 9px;
    font-weight: 500;
    font-size: 21px;
    color: #EB5757;
`

const InboxPage = () => {
    return (
        <Container sx={{pb: '65px'}}>
            <MatchesContainer/>

            <SectionTitle>Messages</SectionTitle>
            <ChatRoomsContainer/>
        </Container>
    );
};

export default InboxPage;