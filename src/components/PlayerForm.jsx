import React, { useState } from 'react';

const avatars = [
  'avatar1.png',
  'avatar2.png',
  'avatar3.png',
  'avatar4.png'
];

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
            {avatars.map((avatarOption) => (
              <label key={avatarOption}>
                <input
                  type="radio"
                  name="avatar"
                  value={avatarOption}
                  checked={avatar === avatarOption}
                  onChange={(e) => setAvatar(e.target.value)}
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
