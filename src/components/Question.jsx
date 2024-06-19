import React, { useState } from 'react';

const Question = ({ country, options, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleButtonClick = (option) => {
    setSelectedAnswer(option);
    const isCorrect = option === country.capital;
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2>What is the capital of {country.name.common}?</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(option)}
            className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
