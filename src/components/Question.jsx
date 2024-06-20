import React, { useState } from 'react';

const Question = ({ country, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === country.capital[0];
    onAnswer(isCorrect);

    setTimeout(() => {
      setSelectedOption(null);
      setIsAnswered(false);
    }, 2000); 
  };

  return (
    <div>
      <h2>What is the capital of {country.name.common}?</h2>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              isAnswered
                ? option === country.capital[0]
                  ? 'correct'
                  : option === selectedOption
                  ? 'wrong'
                  : ''
                : ''
            }`}
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
