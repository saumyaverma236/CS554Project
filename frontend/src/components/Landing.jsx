import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../App.css';

function Landing() {
  return (
    <div className='card'>
      <h2>Welcome to Music Mates</h2>
      <Link to='/signin'>
          <Button 
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
          variant='contained' color='secondary' type='button'>
            Sign In
          </Button>
        </Link>
        <Link to='/signup'>
          <Button variant='contained' color='secondary' type='button'>
            Sign Up
          </Button>
        </Link>
    </div>
  );
}

export default Landing;

