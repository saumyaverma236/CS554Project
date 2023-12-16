//import React, { useState } from 'react';
import '../CreateRoomModal.css'; // Assuming you have your styles in this CSS file

// const CreateRoomModal = ({ isOpen, onClose }) => {
//   const [roomName, setRoomName] = useState('');
//   const [isPublic, setIsPublic] = useState(true);

//   const handleRoomNameChange = (event) => {
//     setRoomName(event.target.value);
//   };

//   const handleVisibilityChange = (visibility) => {
//     setIsPublic(visibility);
//   };

//   const handleSubmit = () => {
//     // Handle the submission of the form, possibly sending the data to a server
//     onClose(); // Close the modal after submit
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Create Room</h2>
//         <label>Room Name</label>
//         <input type="text" value={roomName} onChange={handleRoomNameChange} />
//         <div>
//           <label>Room Visibility</label>
//           <button onClick={() => handleVisibilityChange(true)}>Public</button>
//           <button onClick={() => handleVisibilityChange(false)}>Private</button>
//         </div>
//         <button onClick={handleSubmit}>Create</button>
//       </div>
//     </div>
//   );
// };

// export default CreateRoomModal;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CreateRoomModal(props) {
    const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  function handleRoomNameChange(event) {
    setRoomName(event.target.value);
  }

  function handleVisibilityChange(visibility) {
    setIsPublic(visibility === "public");
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle the creation logic here, possibly involving a backend service
    console.log(`Room Name: ${roomName}, Public: ${isPublic}`);
    let roomId = 'abcdefghijk'
    navigate(`/rooms/${roomId}`);
    props.onClose(); // Close the modal
    
  }

  if (!props.isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="roomName">Room Name</label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={handleRoomNameChange}
            required
          />
          <div>
            <label>
              <input
                type="radio"
                name="visibility"
                checked={isPublic}
                onChange={() => handleVisibilityChange("public")}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                checked={!isPublic}
                onChange={() => handleVisibilityChange("private")}
              />
              Private
            </label>
          </div>
          <button type="submit">Create</button>
          <button onClick={props.onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;
