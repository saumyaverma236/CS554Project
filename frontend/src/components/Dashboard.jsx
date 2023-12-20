
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import CreateRoomModal from './createRoomModal';
import axios from 'axios';
import SignOut from './SignOut';


function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const { currentUser } = useContext(AuthContext);

  console.log('my current user set is:::')
  console.log(currentUser)
  const [accessToken, setAccessToken] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [roomCode, setRoomCode] = useState('');

  const handleRoomCodeChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleJoinRoom = async () => {
    // Implement the logic to join the room using the room code
    console.log('go to room detail')
    

    try {
      const response = await axios.get(`http://localhost:3000/rooms/${roomCode}`);
  const room = response.data;
  console.log('room is::::')
  console.log(room)

  
  navigate(`/rooms/${roomCode}`);
  



  } catch (error) {
      console.log(error)
      alert(error)
  }
    
  };

  const handleCreateRoom = () => {
    // Implement the logic to create a new room
    console.log('create room button tapped')
    setModalOpen(true);
  };


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
      const { data } = await axios.get('http://localhost:3000/usersData/logout');
      //setAccessToken(undefined);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlAccessToken = urlSearchParams.get('access_token');
    setAccessToken(urlAccessToken);

    if (!urlAccessToken) {
      spotifySignOn();
    }
  }, []); 

  useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem('access_token', accessToken);
    }
  }, [accessToken]);

  return (
    <div className='card' style={{ backgroundColor: '#ffe4e1', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h1" style={{ color: '#008080' }}>Music Mates</Typography>
      <Typography variant="h2" style={{ color: '#ff7f50' }}>Welcome back, {currentUser && currentUser.displayName}!</Typography>
      <Typography variant="body1">It's great to see you again.</Typography>
      
      <Button 
       onClick={handleCreateRoom} 
       style={{ 
       backgroundColor: '#40e0d0', 
       color: 'white', 
       padding: '10px 20px', 
       width: '200px', // Fixed width
       margin: '10px auto', // Center the button
       display: 'block' // Make the button a block element
       }}
       variant="contained"
      >
      Create Room
     </Button>


      <CreateRoomModal currentUser={currentUser} isOpen={isModalOpen} onClose={handleModalClose} />

      <Box style={{ margin: '20px' }}>
        <label style={{ color: '#008080' }}>Have a room code? Join a room with it:</label>
        <TextField 
          type="text" 
          value={roomCode} 
          onChange={handleRoomCodeChange}
          style={{ margin: '10px' }}
        />
        <Button 
          onClick={handleJoinRoom}
          
          style={{ 
            backgroundColor: '#ff7f50', 
            color: 'white', 
            padding: '10px 20px', 
            width: '200px', // Fixed width
            margin: '10px auto', // Center the button
            display: 'block' // Make the button a block element
            }}
          variant="contained"
        >
          Join
        </Button>
      </Box>

      {/* <Typography variant="h2" style={{ color: '#ff7f50' }}>
        Hello {currentUser && currentUser.displayName}, this is the Protected Home page
      </Typography> */}

      {accessToken && (
        <>
          <Typography variant="h5" style={{ color: '#008080' }}>Wanna Logout? Click Below</Typography>
          <SignOut />
        </>
      )}
    </div>
  );
}

export default Dashboard;