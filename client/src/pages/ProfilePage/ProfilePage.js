import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, putProfile} from "../../features/auth/authSlice";
import {Avatar, Button, Container, Divider, TextareaAutosize, TextField, Typography} from "@mui/material";
import Header from "../../components/Header";
import AvatarModal from "./components/AvatarModal";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        email: user.email,
        fullName: user.fullName,
        about: user.about
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const updateProfile = (e) => {
        e.preventDefault();
        dispatch(putProfile(formData));
    }

    return (
        <>
            <Header background="#fff" color="#4A4A4A"/>
            <Container sx={{mt: 10}}>
                {/*<Typography variant="h3">Profile</Typography>*/}
                <Avatar
                    onClick={handleOpen}
                    alt="Remy Sharp"
                    src={user.avatarUrl}
                    sx={{ width: 150, height: 150, margin: '30px auto 10px', marginBottom: '24px' }}
                />
                <AvatarModal avatarUrl={user.avatarUrl} open={open} handleClose={handleClose}/>
                <Typography align="center" sx={{fontWeight: 500, fontSize: '20px'}}>{user.fullName}</Typography>
                <Divider sx={{my: 3}}/>

                <Typography align="left" sx={{fontWeight: 500, fontSize: '21px'}}>About</Typography>
                <form style={{textAlign: 'center'}}>
                    <TextField value={formData.fullName} onChange={handleChange} variant="standard" name="fullName" fullWidth label="Full Name" id="fullName" sx={{mb: 1}}/>
                    <TextField value={formData.email} disabled onChange={handleChange} variant="standard" name="email" fullWidth label="Email" id="email" sx={{mb: 1}}/>
                    <TextField value={formData.about} onChange={handleChange} multiline row={2} maxRows={4} variant="standard" name="about" fullWidth label="About" id="about" sx={{mb: 1}}/>
                    <Button onClick={updateProfile} sx={{height: '50px', width: '50%', margin: '15px auto'}} fullWidth variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                    <br/>
                    <Button sx={{height: '50px', width: '50%', margin: '15px auto'}} fullWidth variant="outlined" color="primary" onClick={() => dispatch(logout())}>
                        Logout
                    </Button>
                </form>


            </Container>
        </>

    );
};

export default ProfilePage;