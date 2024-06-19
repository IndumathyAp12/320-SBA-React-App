import React, { useState } from 'react';

const Question = ({ country, options, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = selectedAnswer === country.capital;
    onAnswer(isCorrect);
    setSelectedAnswer('');
  };

  return (
    <div>
      <h2>What is the capital of {country.name.common}?</h2>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name="capital"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {option}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Question;
