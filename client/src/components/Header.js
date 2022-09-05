import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {logout} from "../features/auth/authSlice";

const Header = ({color = '#fff', background = 'none'}) => {
    const dispatch = useDispatch();
    return (
        <AppBar sx={{boxShadow: "none", background, px:2}} color="transparent" position="fixed">
            <Container>
                <Toolbar sx={{p: 0, justifyContent: "space-between", alignItems: "center"}}>
                    <Typography sx={{color, fontWeight: 800}} variant="h4">
                        DatingOn
                    </Typography>
                    {/*<Logout onClick={() => dispatch(logout())} sx={{width: '40px', height: '40px'}}/>*/}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;