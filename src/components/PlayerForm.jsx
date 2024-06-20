import React, { useState } from 'react';
import avatar1 from './images/avatar1.png';  
import avatar2 from './images/avatar2.png';  
import avatar3 from './images/avatar3.png';  
import avatar4 from './images/avatar4.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];

const PlayerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && avatar) {
      onSubmit({ name, avatar });
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Player Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="avatar">Choose Avatar:</label>
          <div className="avatar-options">
            {avatars.map((avatarOption, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="avatar"
                  value={avatarOption}
                  checked={avatar === avatarOption}
                  onChange={() => setAvatar(avatarOption)}
                />
                <img src={avatarOption} alt="Avatar" className="avatar-preview" />
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default PlayerForm;
