import React, {lazy, useMemo} from 'react';
import PrivateRoute from '../components/PrivateRoute';
import {Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import InboxPage from "../pages/InboxPage/InboxPage";
import ChatPage from "../pages/InboxPage/ChatPage";

const AppContainer = () => {
    return (
        <>
            <Routes>
                <Route index element={<PrivateRoute><HomePage/></PrivateRoute>}/>
                <Route path="/inbox" element={<PrivateRoute><InboxPage/></PrivateRoute>}/>
                <Route path="/inbox/chat/:id" element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
                <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path="/signup" element={<RegistrationPage/>}/>
                <Route path="/signin" element={<LoginPage/>}/>
                <Route path="*" element={<p>There's nothing here: 404!</p>}/>
            </Routes>
        </>
    );
};

export default AppContainer;