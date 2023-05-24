import React from 'react'
import LoginFormComp from '../components/LoginFormComp'
import SignupFormComp from '../components/SignupFormComp'
// import the style from the react-bootstrap
import { Container, Row, Col } from 'react-bootstrap';


// function Login() {
//     return (
//         <div>
//             <h1>Welcome to Fitness 60+!</h1>
//             <div className='card-container'>
//                 <h2>Welcome Back!</h2>
//             <LoginFormComp />
//             </div>
//             <div className='card-container'>
//                 <h2>New to Fitness 60+ ?</h2>
//             <SignupFormComp />
//             </div>
//          </div>
//     );
// };

function Login() {
    return (
      <Container className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <h1>Welcome to Fitness 60+!</h1>
        <div className='40-w p-5 rounded'>
        <form>
            <div className='mb-2'>
              <h2>Welcome Back!</h2>
              <LoginFormComp />
            </div>

            <div className='mb-2'>
              <h2>New to Fitness 60+?</h2>
              <SignupFormComp />
            </div>
        </form>
        </div>
      </Container>
    );
  }

  
  export default Login