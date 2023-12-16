import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import CreateRoomModal from './createRoomModal';
import axios from 'axios';

function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const { currentUser } = useContext(AuthContext);

  const [roomCode, setRoomCode] = useState('');

  const handleRoomCodeChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleJoinRoom = () => {
    // Implement the logic to join the room using the room code
    console.log('go to room detail')
    let roomId = 'abcdefghijk'
    navigate(`/rooms/${roomId}`);
    
  };

  const handleCreateRoom = () => {
    // Implement the logic to create a new room
    console.log('create room button tapped')
    setModalOpen(true);
  };


  const spotifySignOn = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/users/login'
      );
      console.log('data', data);

      // const redirectUri = encodeURIComponent('http://localhost:5173/dashboard');
      // const spotifyAuthUrl = `${data}&redirect_uri=${redirectUri}`;

      window.location.href = data;

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='card'>
      <h1>Music Mates</h1>
      <h2>Welcome back, {currentUser && currentUser.displayName}!</h2>
      <p>It's great to see you again.</p>
      <button className="create-room-button" onClick={handleCreateRoom}>Create Room</button>
      <CreateRoomModal isOpen={isModalOpen} onClose={handleModalClose} />
      <div className="room-code-input">
        <label>Have a room code? Join a room with it:</label>
        <input type="text" value={roomCode} onChange={handleRoomCodeChange} />
        <button onClick={handleJoinRoom}>Join</button>
      </div>
      
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
