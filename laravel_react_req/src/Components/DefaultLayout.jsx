import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextprovider'
import axiosClient from '../axiosClient';
import { NavbarSimple } from './NavBarSimple';

const DefaultLayout = () => {

    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.get('/logout')
            .then(({ }) => {
                setUser(null)
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            
            <Outlet />
        </>

    )
}

export default DefaultLayout