import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextprovider';
import { NavbarSimple } from './NavBarSimple';

const GuestLayout = () => {

    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/requisiciones" />
    }

    return (
        <> 
            <Outlet />
        </>
    )
}

export default GuestLayout