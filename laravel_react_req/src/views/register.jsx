import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
    CardHeader,
} from "@material-tailwind/react";
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import '../index.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: name,
            email: email,
            password: password
        };

        axiosClient.post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <Card className="max-w-md shadow-lg p-8" style={{ width: '360px' }}>
                <CardHeader
                    variant="filled"
                    color='gray'
                    className="grid m-0 mb-4 h-24 w-full place-items-center "
                >
                    <Typography variant="h4" color="white" className="text-center">
                        Registrarse
                    </Typography>
                </CardHeader>
                <form className="mt-4 mb-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <Input
                            size="lg"
                            type="name"
                            placeholder="Nombre de usuario"
                            label="Nombre de usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<i className="fa fa-user" />}
                        />
                        <Input
                            size="lg"
                            type="email"
                            placeholder="nombre@correo.com"
                            label="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<i className="fa fa-envelope" />}
                        />
                        <Input
                            size="lg"
                            type="password"
                            placeholder="********"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<i className="fa fa-lock" />}
                        />
                    </div>
                    <Button type="submit" className="mt-6 bg-pink-800" fullWidth>
                        Registrarse
                    </Button>
                    <Typography color="gray" variant='small' className="mt-4 text-center font-normal">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="font-medium text-pink-800">
                            Iniciar sesión
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Register;
