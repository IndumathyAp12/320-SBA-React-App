import React, { useState } from 'react';

const Question = ({ country, options, onAnswer, showNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    if (!showFeedback) {
      setSelectedOption(option);
      setShowFeedback(true);
      const isCorrect = option === country.capital;
      onAnswer(isCorrect);
      setTimeout(showNextQuestion, 2000); 
    }
  };

  return (
    <div>
      <h2>What is the capital of {country.name.common}?</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${showFeedback && option === country.capital ? 'correct' : ''} ${showFeedback && option === selectedOption && option !== country.capital ? 'wrong' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
