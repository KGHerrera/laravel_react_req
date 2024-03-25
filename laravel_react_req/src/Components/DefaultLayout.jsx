import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextprovider'
import axiosClient from '../axiosClient';

const DefaultLayout = () => {

    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.get('/logout')
            .then(({}) => {
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
        <div>
            <div>
                <header>
                    <div>Header</div>
                </header>

                <div>{user?.name}
                <a href="#" onClick={onLogout}> LogOut</a>
                </div>

                <main><Outlet /></main>

            </div>




        </div>

    )
}

export default DefaultLayout