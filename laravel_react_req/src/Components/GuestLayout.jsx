import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextprovider';

const GuestLayout = () => {

    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div>GuestLayout</div>
            <Outlet />
        </div>
    )
}

export default GuestLayout