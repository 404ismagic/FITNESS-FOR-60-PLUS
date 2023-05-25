import React from 'react'
import LoginFormComp from '../components/LoginFormComp'
import SignupFormComp from '../components/SignupFormComp'
import './Loginpg.css';


function Login() {
    return (
        <div>
            <h1 className='two'>Welcome to Fitness 60+</h1>
            <div className='card-one'>
                <h2>Welcome Back!</h2>
            <LoginFormComp />
            </div>
            <div className='card-one'>
                <h2>New to Fitness 60+ ?</h2>
            <SignupFormComp />
            </div>
         </div>
    );
};
export default Login