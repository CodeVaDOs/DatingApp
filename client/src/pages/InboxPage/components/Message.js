import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";

const style = {
    avatar: {
        width: '57px',
        height: '57px'
    },
    messageBox: {
        marginLeft: '10px',
        backgroundColor: '#EAEAEA',
        padding: '15px',
        borderRadius: '10px',
    },
    message: {

    }
}

const Message = ({message, user, side}) => {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            marginBottom: '15px',
            justifyContent: side === 'left' ? 'flex-start' : 'flex-end'
        }}>
            {side === 'left' && <Avatar style={style.avatar} src={user.avatarUrl}/>}
            <Box sx={{
                marginLeft: side === 'left' ? '10px' : 0,
                marginRight: side === 'right' ? '10px' : 0
            }} style={style.messageBox}>
                <Typography style={style.message}>
                    {message.body}
                </Typography>
            </Box>
            {side === 'right' && <Avatar style={style.avatar} src={user.avatarUrl}/>}
        </Box>
    );
};

export default Message;