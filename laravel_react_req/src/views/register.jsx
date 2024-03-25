import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

const register = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        

        axiosClient.post("/register", payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }

            
            console.log(err)
        })
    }

    return (
        <div>
            <div>

                <h1>Create an Account</h1>
                <form onSubmit={Submit}>

                    <input ref={nameRef} type="name" placeholder='Name' />
                    <input ref={emailRef} type="email" placeholder='Email' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <input type="submit" value="Register" />
                    <p>Already have an account?<Link to="/login">Login</Link></p>
                </form>
            </div>

        </div>
    )
}

export default register