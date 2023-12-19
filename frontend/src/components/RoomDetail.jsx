
// import React, { useState } from 'react';
import '../RoomDetail.css'; // Your CSS file for styling
import WebPlayback from './WebPlayback';
import io from 'socket.io-client';
import React,{useRef, useState, useEffect} from 'react';

const RoomDetail = () => {
  const [chat, setChat] = useState([{name:'a',message:'hello'}]); // Placeholder for chat messages
  const [newMessage, setNewMessage] = useState('');

  const [playerState, setPlayerState] = useState(undefined)

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');
    socketRef.current.emit('user_join', 'Shreyak G');
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  useEffect(() => {
    console.log('use effect fired')
    socketRef.current.on('message', ({name, message}) => {
      console.log('The server has broadcast message data to all clients');
      setChat([...chat, {name, message}]);
      console.log(chat)
    });
    socketRef.current.on('user_join', function (data) {
      console.log('wadupppppppppppppppppppppppppppppppppp')  
      console.log('The server has broadcast user join event to all clients');
      setChat([
        ...chat,
        {name: 'ChatBot', message: `${data} has joined the chat`}
      ]);
    });

    socketRef.current.on('update_player_state', (state) => {
        // Here, you'd use the Spotify Web Playback SDK to update the player state
        console.log('Received player state update from server:', state);
      });

    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user_join');
      
    };
  }, [chat]);

  useEffect(() => {
    socketRef.current.on('update_player_state', (state) => {
        // Here, you'd use the Spotify Web Playback SDK to update the player state
        console.log('Received player state update from server:', state);
        setPlayerState(state)
      });

      return () => {
        socketRef.current.off('update_player_state')
      }
  },[playerState])

  
  

  const handleSend = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toISOString();
    // setChat([...chat, { name: 'Shreyak', message: newMessage}]);
    socketRef.current.emit('message', {
        name: 'Shreyak',
        message: newMessage
      });
      setNewMessage(''); // Reset input field
    }
  };

  return (
    <div className="room-detail-container">
      <div className="room-header">
        {/* Room Header Content */}
        <h1>Room Name</h1>
        {/* Other controls */}
      </div>
      <div className="music-player">
        <div>
        <WebPlayback token={ window.localStorage.getItem('access_token') } socketRef={socketRef} playerState={playerState}/>
        </div>
      </div>
      <div className="chat-box">
        <div className="messages">
          {chat.map((obj, index) => (
            <div key={index} className="message">
              <span>{obj.message}</span>
              <span className="timestamp">{obj.name}</span>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

// import React, { useState } from 'react';
// import '../RoomDetail.css'; // Your CSS file for styling
// import WebPlayback from './WebPlayback';

// const RoomDetail = () => {
//   const [messages, setMessages] = useState([]); // Placeholder for chat messages
//   const [newMessage, setNewMessage] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim()) {
//       const timestamp = new Date().toISOString();
//       setMessages([...messages, { text: newMessage, timestamp }]);
//       setNewMessage(''); // Reset input field
//     }
//   };

//   return (
//     <div className="room-detail-container">
//       <div className="room-header">
//         {/* Room Header Content */}
//         <h1>Room Name</h1>
//         {/* Other controls */}
//       </div>
//       <div className="music-player">
//         <div>
//         <WebPlayback token={ window.localStorage.getItem('access_token') } />
//         </div>
//       </div>
//       <div className="chat-box">
//         <div className="messages">
//           {messages.map((message, index) => (
//             <div key={index} className="message">
//               <span>{message.text}</span>
//               <span className="timestamp">{message.timestamp}</span>
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Send a message..."
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetail;

