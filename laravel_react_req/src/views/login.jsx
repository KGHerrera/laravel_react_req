import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import '../index.css';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        axiosClient.post("/login", payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <Card className="max-w-md shadow-lg px-4 py-4">
                <Typography variant="h4" color="blue-gray" className="text-center">
                    Iniciar sesión
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    ¡Bienvenido! ingresa los datos para iniciar.
                </Typography>
                <form className="mt-4 mb-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <Input
                            size="lg"
                            type="email"
                            placeholder="nombre@correo.com"
                            label="Correo electrónico"
                            ref={emailRef}
                        />
                        <Input
                            size="lg"
                            type="password"
                            placeholder="********"
                            label="Contraseña"
                            ref={passwordRef}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                Recuérdame
                            </Typography>
                        }
                    />
                    <Button type="submit" className="mt-2" fullWidth>
                        Iniciar sesión
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="font-medium text-gray-900">
                            Registrarse
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Login;

