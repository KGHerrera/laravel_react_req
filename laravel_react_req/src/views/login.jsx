import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    CardHeader,
} from "@material-tailwind/react";
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import '../index.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useStateContext();

    const [errors, setErrors] = useState(null);




    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        axiosClient.post("/login", payload)
            .then(({ data }) => {
                if (data.user && data.token) {
                    // Las credenciales son correctas, establecer usuario y token
                    setUser(data.user);
                    setToken(data.token);
                    setErrors(null);
                } else {
                    // Credenciales incorrectas, mostrar mensaje de error
                    setErrors({ message: "El correo electrónico o la contraseña no coinciden." });

                }
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {

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
                    className="grid m-0 mb-4 h-24 w-full place-items-center"
                >
                    <Typography variant="h4" color="white" className="text-center">
                        Iniciar Sesión
                    </Typography>
                </CardHeader>

                <form className="mt-4 mb-4" onSubmit={handleSubmit}>


                    {/* <Typography color="gray" className="mt-4 mb-4 font-normal text-center">
                        ¡Bienvenido! ingresa tus datos.
                    </Typography> */}

                    <div className="flex flex-col gap-6 mb-2">

                        <div>
                            <Input
                                size="lg"
                                type="email"
                                placeholder="nombre@correo.com"
                                label="Correo electrónico " icon={<i className="fa fa-user" />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                
                            />

                            {errors && errors.email && (

                                <p className="text-pink-800 text-xs mt-1">{errors.email}</p>

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

                                <p className="text-pink-800 text-xs mt-1">{errors.email}</p>

                            )}

                            {errors && errors.message && (

                                <p className="text-pink-800 text-xs mt-1">{errors.message}</p>

                            )}
                        </div>
                    </div>
                    <Checkbox color='pink' className='fill-pink-800'
                        label={
                            <Typography
                                variant="small"
                                
                                className="flex items-center font-normal"
                            >
                                Recuérdame
                            </Typography>
                        }
                    />
                    <Button type="submit" className="bg-pink-800 mt-2" fullWidth>
                        Iniciar sesión
                    </Button>



                    <Typography color="gray" variant='small' className="mt-4 text-center font-normal">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="font-medium text-pink-800">
                            Registrarse
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Login;


