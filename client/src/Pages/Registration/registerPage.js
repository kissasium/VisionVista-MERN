import React, { useState } from 'react';


import './registerPage.css'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios'



const Register = () => {
    // Navigate to login page using Hook
    const navigate = useNavigate();
    // Retain State using useState hook
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });
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
        // validation  for password
        if (inputs.password.length < 8 || inputs.password.length > 15 || !inputs.password.match(/[a-zA-Z]/)) {
            alert('Password must be between 8 and 15 characters long and should contain at least one letter.');
            return;
        }

        //  email should only contain 1 @  
        const atcount = (inputs.email.match(/@/g) || []).length;
        if (atcount !== 1) {
            alert('Please enter an email address with exactly one "@" character');
            return false;
        }

        const domains = ['gmail', 'yahoo', 'hotmail', 'outlook'];
        const domain = inputs.email.split('@')[1].split('.')[0];
        if (!domains.includes(domain))                     //  will check for the valid domain names 
        {
            alert('Pls enter valid domain (gmail, yahoo, hotmail, outlook).');
            return false;
        }


        if (!inputs.email.includes('@') || !inputs.email.includes('.'))     // it should contain @ and a .
        {
            alert('Please enter a valid email address.');
            return;
        }

        // usernames checks
        if (inputs.username.length < 3 || inputs.username.length > 15 || !inputs.username.match(/[a-zA-Z]/)) {
            alert('Username must be between 3 and 15 characters :( ');
            return;
        }

        try {
            const response = await axios.post('/api/v1/user/register',
                {
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                });
            if (response.data.success) {
                alert('User Created Successfully');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className='main'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit} action=''>
                        <h1>Register</h1>
                        <div className='input-box'>
                            <input type='text' placeholder='Username' name='username' required value={inputs.username} onChange={handleInputs} />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='text' placeholder='Email' name='email' required value={inputs.email} onChange={handleInputs} />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Password' name='password' required value={inputs.password} onChange={handleInputs} />
                            <FaLock className='icon' />
                        </div>
                        <button type="submit">Register</button>
                        <div onClick={() => navigate('/')} className='register-link'>
                            <p>Already have an Account? <a href='#'> LogIn</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register;