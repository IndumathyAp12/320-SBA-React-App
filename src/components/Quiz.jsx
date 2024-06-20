import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import PlayerForm from './PlayerForm';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [player, setPlayer] = useState(null);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  const handlePlayerSubmit = (playerData) => {
    setPlayer(playerData);
  };

  if (questions.length === 0) {
    return <p>No questions available</p>;
  }

  return (
    <div className="App">
      {!player ? (
        <PlayerForm onSubmit={handlePlayerSubmit} />
      ) : (
        <>
          {showResult ? (
            <div className="result-container">
              <Result score={score} totalQuestions={questions.length} />
              <button onClick={handleRestart}>Restart Quiz</button>
            </div>
          ) : (
            <div className="question-container">
              <div className="player-info">
                <img src={player.avatar} alt="Avatar" className="avatar" />
                <h2>{player.name}</h2>
              </div>
              <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
              <Question
                key={currentQuestionIndex}
                country={questions[currentQuestionIndex]}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
