import React, {useState} from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {putAvatar} from "../../../features/auth/authSlice";

const AvatarModal = ({avatarUrl, open, handleClose}) => {
    const [url, setUrl] = useState(avatarUrl);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(putAvatar({avatarUrl: url}))
        handleClose();
    }

    const handleChange = (e) => {
        setUrl(e.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextField value={url} onChange={handleChange} name="avatarUrl" placeholder="Avatar url"/>
                <Button onClick={handleSubmit}>Save</Button>
            </Box>
        </Modal>
    );
};

export default AvatarModal;