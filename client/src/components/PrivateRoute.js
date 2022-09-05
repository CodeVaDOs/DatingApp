import React from 'react';
import { useSelector } from 'react-redux';
import {Route, Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = ({ redirectPath = '/signin', children }) => {
    const { authorized } = useSelector((state) => state.auth);

    if (authorized) {
        return children;
    }

    return <Navigate to={redirectPath} />;
};

export default PrivateRoute;