import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Box, Button, CircularProgress, Container, ListItem, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createChat, createMessage, getCurrentChat} from "../../features/match/chatSlice";
import {ArrowBackIos, ArrowLeft, Send} from "@mui/icons-material";
import Message from "./components/Message";

const style = {
    avatar: {
        width: '57px',
        height: '57px',
    },
    userBox: {
        marginLeft: '12px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        marginBottom: '10px'
    },
    avatarName: {
        fontWeight: 800,
        fontSize: '19px',
        color: '#4A4A4A',
        marginLeft: '15px'
    },
    avatarMessage: {
        fontWeight: 400,
        fontSize: '16px',
        color: '#9B9B9B',
    }
}


const ChatPage = () => {
    let {id} = useParams();

    const [message, setMessage] = useState('');



    const messagesEndRef = useRef(null)
    const dispatch = useDispatch();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        if (message) {
            dispatch(createMessage({id, body: message}))
        }
    }

    useEffect(() => {
        dispatch(getCurrentChat({id}))
    }, [])

    const currentUser = useSelector(state => state.auth.user);
    const currentChat = useSelector(state => state.chat.currentChat);



    useEffect(() => {
        scrollToBottom()
    }, [currentChat?.messageList])

    const navigate = useNavigate();

    if (!currentChat) return <CircularProgress/>

    console.log(currentChat)
    return (
        <Container sx={{
            overflow: 'hidden',
            height: '100%'
        }}>
            <Box style={style.userBox}>
                <ArrowBackIos onClick={() => {
                    navigate('/inbox')
                }}/>
                <Avatar style={style.avatar} src={currentChat?.userList[0].avatarUrl}/>
                <Typography style={style.avatarName}>
                    {currentChat?.userList[0].fullName}
                </Typography>
            </Box>

            <Box sx={{
                height: 'calc(100% - 160px)',
                overflow: 'scroll'
            }}>
                {currentChat?.messageList?.map(m => (
                    <Message message={m} side={m.senderId === currentUser.id ? 'right' : 'left'} user={m.senderId === currentUser.id ? currentUser : currentChat?.userList[0]}/>
                ))}
                <div ref={messagesEndRef}></div>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <TextField value={message} onChange={handleChangeMessage} sx={{
                    width: '100%'
                }}
                           placeholder="Enter message"/>
                <Button onClick={handleSubmit}><Send sx={{fill: '#F65E7E'}}/></Button>
            </Box>
        </Container>
    );
};

export default ChatPage;