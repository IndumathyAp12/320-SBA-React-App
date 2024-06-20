import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';

const Quiz = ({ questions, fetchQuestions, player }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  }, [questions]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    }
  };

  const handleRestart = () => {
    fetchQuestions(); 
  };

  if (questions.length === 0) {
    return <p>No questions available</p>;
  }

  return (
    <div className="App">
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
    </div>
  );
};

export default Quiz;
