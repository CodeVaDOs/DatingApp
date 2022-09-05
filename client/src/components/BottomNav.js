import React from 'react';
import {BottomNavigation, BottomNavigationAction as MuiBottomNavigationAction, makeStyles, Paper} from "@mui/material";
import {Home, Inbox, Person} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";
import styled from "@emotion/styled";
import {usePathPattern} from "../hooks/usePathPattern";


const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: #99A3B0;
  &.Mui-selected {
    color: #F65E7E;
  }
`);

const getCurrentPathNumber = (path) => {
    switch (path) {
        case "/":
            return 0;
        case "/inbox":
        case "/inbox/chat/:id":
            return 1;
        case "/profile":
            return 2;
        default:
            return 0;
    }
}

const BottomNav = () => {
    const currentPath = usePathPattern();
    const [value, setValue] = React.useState(getCurrentPathNumber(currentPath));

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, pb: 1}} elevation={3}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction component={Link}
                                        to="/" label="Home" icon={<Home/>}/>
                <BottomNavigationAction component={Link}
                                        to="/inbox" label="Inbox" icon={<Inbox/>}/>
                <BottomNavigationAction component={Link}
                                        to="/profile" label="Profile" icon={<Person/>}/>
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;