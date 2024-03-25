import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

const login = () => {


    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

    
        axiosClient.post("/login", payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        })
    }

    return (
        <div>
            <div>

                <h1>Login to your account</h1>
                <form action="" onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder='Email' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <input type="submit" value="Login" />
                    <p>Don't have an account? <Link to="/register">Create a new account</Link></p>
                </form>
            </div>

        </div>
    )
}

export default login