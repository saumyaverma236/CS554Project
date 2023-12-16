import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import axios from 'axios';

function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const spotifySignOn = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/users/login');
      window.location.href = data;
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const spotifyLogout = async () => {
    try {
      // const { data } = await axios.get('http://localhost:3000/users/logout');
      setAccessToken(undefined);
      window.localStorage.removeItem('access_token');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlAccessToken = urlSearchParams.get('access_token');
    setAccessToken(urlAccessToken);
  }, []); 

  useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem('access_token', accessToken);
    }
  }, [accessToken]);

  return (
    <div className='card'>
      <h2>
        Hello {currentUser && currentUser.displayName}, this is the Protected Home page
      </h2>
      {!accessToken && (
        <img
          onClick={() => spotifySignOn()}
          alt='spotify signin'
          src='/imgs/btn_spotify_signin.png'
        />
      )}
      {accessToken && (
        <>
          <h5>You're Logged into Spotify. Wanna Logout? Click Below</h5>
          <img
            onClick={() => spotifyLogout()}
            alt='spotify signin'
            src='/imgs/btn_spotify_logout.png'
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
