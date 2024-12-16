import React, { useState } from 'react'
import './loginPage.css'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios'

import { useDispatch } from 'react-redux';
import { authenticationActions } from '../../Redux/store';

const Login = () => {
    // Navigate to login page using Hook
    const navigate = useNavigate();
    // Retain State using useState hook
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    // Create a dispatch hook
    const dispatch = useDispatch();
    // Handle Input Change
    const handleInputs = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //Handle registration form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const labelToggle = document.getElementById('invLbl');
        labelToggle.style.display = 'none';
        try {
            const response = await axios.post('/api/v1/user/login',
                {
                    email: inputs.email,
                    password: inputs.password
                });
            if (response.data.success) {

                console.log("Id: ");
                console.log(response.data.userId);
                dispatch(authenticationActions.login());
                localStorage.setItem('userId', response.data.userId);
                alert('LogIn Successful');
                navigate('/landing');
            }

            labelToggle.style.display = 'block';

        } catch (error) {
            labelToggle.style.display = 'block';
        }
    }

    return (
        <>
            <div className='main'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>LogIn</h1>
                        <div className='input-box'>
                            <input type='text' placeholder='Email' name='email' required value={inputs.email} onChange={handleInputs} />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Password' name='password' required value={inputs.password} onChange={handleInputs} />
                            <FaLock className='icon' />
                        </div>
                        <button type="submit">LogIn</button>
                        <label id='invLbl'>Invalid Email or Password</label>
                        <div onClick={() => navigate('/register')} className='register-link'>
                            <p>Don't have an account? <a href='#'>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login;