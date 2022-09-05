import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {Button, Checkbox, Container, Grid, TextField, Typography} from "@mui/material";
import {login} from "../features/auth/authSlice";
import Logo from "../components/ui/Logo";

const defaultValues = {
    email: 'user@gmail.com',
    password: 'user'
}

const RegistrationPage = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const dispatch = useDispatch();

    const {authorized} = useSelector((state) => state.auth);
    if (authorized) return <Navigate to="/"/>

    const handleChange = (e) => {
        const {value, name} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formValues));
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
            <Logo/>
            <Typography sx={{mb: 3}} variant="h4" align="center">Log in</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <TextField variant="filled" sx={{mb: 1}} fullWidth label="Email*" id="email" name="email" type="email" value={formValues.email} onChange={handleChange}/>
                    <TextField variant="filled" sx={{mb: 2}} fullWidth label="Password*" id="password" name="password" type="password" value={formValues.password} onChange={handleChange}/>
                    <Button sx={{height: '50px', width: '50%'}} fullWidth variant="contained" color="primary" type="submit">
                        Sign in
                    </Button>
                </Grid>
            </form>

            <Typography sx={{mt: 1}}>Don't have an account? <Link to="/signup">Sign up</Link></Typography>
        </Container>
    );
};

export default RegistrationPage;