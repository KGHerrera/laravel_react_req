import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Typography } from "@material-tailwind/react";
import { useStateContext } from '../contexts/contextprovider';

const LandingPage = () => {

    const { user, token, setUser, setToken } = useStateContext();

    if (token) {
        return <Navigate to="/requisiciones" />
    } 


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 flex-col">
            <div className='flex flex-col items-center' >
                <Typography className="w-full text-left mb-3 text-8xl text-pink-500">
                    Bienvenido
                </Typography>
                <Typography className="text-left text-md mb-8 text-gray-200">
                    Descubre lo que nuestra aplicación puede ofrecerte.
                </Typography>
                <div className="flex gap-4">
                    <Link to="/login">
                        <Button variant='filled' color='pink' ripple="light"><span className='fa fa-sign-in'></span> Iniciar sesión</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant='filled' ripple="light"><span className='fa fa-user'></span> Registrarse</Button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;
