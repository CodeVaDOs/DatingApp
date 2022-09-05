import React, {useEffect} from 'react';
import {Avatar, List, ListItem, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createChat, getMatches} from "../../../features/match/chatSlice";
import {SectionTitle} from "../InboxPage";

const style = {
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        gap: '14px',
        overflow: 'scroll',
        minHeight: '74px'
    },
    avatar: {
        width: '57px',
        height: '57px'
    },
    listItem: {
        width: '57px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    avatarName: {
        fontWeight: 300,
        fontSize: '14px',
        textAlign: 'center',
        color: '#4A4A4A',
        marginTop: '5px'
    }
}

const MatchesContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMatches());
    }, [])

    const matches = useSelector(state => state.chat.matches);

    const createChatRoom = (userId) => {
        dispatch(createChat({userId}));
    }

    if (matches.length === 0) return null;

    return (
        <>
            <SectionTitle>New Matches</SectionTitle>

            <List style={style.flexContainer}>
                {matches.map(m => (
                    <ListItem key={m.id} onClick={createChatRoom.bind(null, m.id)} style={style.listItem}>
                        <Avatar style={style.avatar} src={m.avatarUrl}/>
                        <Typography style={style.avatarName}>
                            {m.fullName.split(' ').pop()}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    )
        ;
};

export default MatchesContainer;