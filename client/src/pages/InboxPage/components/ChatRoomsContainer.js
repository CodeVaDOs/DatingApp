import React, {useEffect} from 'react';
import {Avatar, Box, List, ListItem, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getChatRooms, getMatches} from "../../../features/match/chatSlice";
import {useNavigate} from "react-router-dom";

const style = {
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'scroll',
    },
    avatar: {
        width: '57px',
        height: '57px',
    },
    listItem: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    userBox: {
        marginLeft: '12px',
    },
    avatarName: {
        fontWeight: 800,
        fontSize: '19px',
        color: '#4A4A4A',
    },
    avatarMessage: {
        fontWeight: 400,
        fontSize: '16px',
        color: '#9B9B9B',
    }
}

const ChatRoomsContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getChatRooms());
    }, [])
    let navigate = useNavigate();


    const openChat = (chatId) => {
        navigate("/inbox/chat/" + chatId);
    }

    const chatRooms = useSelector(state => state.chat.chatRooms);
    return (
        <List style={style.flexContainer}>
            {chatRooms.map(c => (
                <ListItem onClick={openChat.bind(null, c.id)} key={c.id} style={style.listItem}>
                    <Avatar style={style.avatar} src={c.userList[0].avatarUrl}/>
                    <Box style={style.userBox}>
                        <Typography style={style.avatarName}>
                            {c.userList[0].fullName}
                        </Typography>
                        <Typography style={style.avatarMessage}>
                            {c.messageList[c.messageList.length - 1]?.senderId === c.userList[0]?.id ? '' : 'You: '}{c.messageList[c.messageList.length - 1]?.body || ""}
                        </Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default ChatRoomsContainer;