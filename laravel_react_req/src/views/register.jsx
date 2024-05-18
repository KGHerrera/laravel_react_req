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
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}; // Objeto para almacenar los errores

        // Verificar si el campo de correo electrónico está vacío
        if (!email) {
            errors.email = "El campo de correo electrónico es obligatorio.";
        }

        // Verificar si el campo de contraseña está vacío
        if (!password) {
            errors.password = "El campo de contraseña es obligatorio.";
        }

        if (password && password.length < 8) {
            errors.password = "El campo de contraseña debe tener 8 caracteres.";
        }

        // Verificar si el campo de nombre está vacío
        if (!name || name.trim() === '') {
            errors.name = "El campo de nombre es obligatorio.";
        }

        // Si hay errores, establecerlos y detener la ejecución de la función
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

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
                    setErrors(response.data.errors);
                }


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
                    <div className="flex flex-col gap-6 mb-6">

                        <div>
                            <Input
                                size="lg"
                                type="name"
                                placeholder="Nombre de usuario"
                                label="Nombre de usuario"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                icon={<i className="fa fa-user" />}
                            />

                            {errors && errors.name && (

                                <p className="text-pink-600 text-xs mt-1">{errors.name}</p>

                            )}
                        </div>

                        <div>
                            <Input
                                size="lg"
                                type="email"
                                placeholder="nombre@correo.com"
                                label="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<i className="fa fa-envelope" />}
                            />

                            {errors && errors.email && (

                                <p className="text-pink-600 text-xs mt-1">{errors.email}</p>

                            )}

                        </div>

                        <div>

                            <Input
                                size="lg"
                                type="password"
                                placeholder="********"
                                label="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<i className="fa fa-lock" />}
                            />

                            {errors && errors.password && (

                                <p className="text-pink-600 text-xs mt-1">{errors.password}</p>

                            )}

                        </div>

                    </div>
                    <Button type="submit" color='pink' className="mt-6" fullWidth>
                        Registrarse
                    </Button>
                    <Typography color="gray" variant='small' className="mt-4 text-center font-normal">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="font-medium text-pink-600">
                            Iniciar sesión
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Register;
