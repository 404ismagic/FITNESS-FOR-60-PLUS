import React from 'react'
import LoginFormComp from '../components/LoginFormComp'
import SignupFormComp from '../components/SignupFormComp'
// import the style from the react-bootstrap
import { Container, form, Row, Col } from 'react-bootstrap';


function Login() {
     return (
         <div>
              <h1>Welcome to Fitness 60+!</h1>
            <div className='card-container'>
                 <h2>Welcome Back!</h2>
             <LoginFormComp />
             </div>
             <div className='card-container'>
                 <h2>New to Fitness 60+ ?</h2>
             <SignupFormComp />
             </div>
          </div>
     );
 };
  
  export default Login
