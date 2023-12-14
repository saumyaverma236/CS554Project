import React, { useState, useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import axios from 'axios';

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  const spotifySignOn = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/users/login'
      );
      console.log('data', data);

      const redirectUri = encodeURIComponent('http://localhost:5173/dashboard');
      const spotifyAuthUrl = `${data}&redirect_uri=${redirectUri}`;

      window.location.href = spotifyAuthUrl;

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='card'>
      <h2>
        Hello {currentUser && currentUser.displayName}, this is the Protected Home page
      </h2>
      <img
        onClick={() => spotifySignOn()}
        alt='spotify signin'
        src='/imgs/btn_spotify_signin.png'
      />
    </div>
  );
}

export default Dashboard;
