import React, {useContext} from 'react';
import SocialSignIn from './SocialSignIn';
import {Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import {doPasswordReset, doSignInWithEmailAndPassword} from '../firebase/FirebaseFunctions'

function SignIn() {
  const {currentUser} = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let {email, password} = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div>
      <div className='card'>
        <h1>Login to MusicMates</h1>
        <form className='form' onSubmit={handleLogin}>
          <div className='form-group'>
            <label>
              Email Address:
              <br />
              <input
                className='form-control'
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                required
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Password:
              <br />
              <input
                className='form-control'
                name='password'
                type='password'
                placeholder='Password'
                autoComplete='off'
                required
              />
            </label>
          </div>

          <Button className='button' type='submit'>
            Log in
          </Button>

          <Button className='forgotPassword' onClick={passwordReset}>
            Forgot Password
          </Button>
          <Link to='/signup'>
          <Button variant='contained' color='secondary' type='button'>
            Not a Member? Sign Up
          </Button>
        </Link>
        </form>
        

        <br />
        <SocialSignIn />
      </div>
    </div>
  );
}

export default SignIn;
