import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';
import PlayerForm from './PlayerForm';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = () => {
    setLoading(true);
    axios.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies')
      .then(response => {
        const countriesData = response.data.filter(country => country.capital && country.capital.length > 0);
        const shuffledCountries = shuffleArray(countriesData).slice(0, 10);
        const questions = shuffledCountries.map(country => ({
          ...country,
          options: generateOptions(country, countriesData)
        }));
        setQuizQuestions(questions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomCapitals = (countriesData, currentCapital) => {
    const filteredCapitals = countriesData
      .filter(country => country.capital && country.capital[0] !== currentCapital)
      .map(country => country.capital[0]);
    return shuffleArray(filteredCapitals).slice(0, 3);
  };

  const generateOptions = (country, countriesData) => {
    const randomCapitals = getRandomCapitals(countriesData, country.capital[0]);
    const optionsSet = new Set([country.capital[0], ...randomCapitals]);
    return shuffleArray([...optionsSet]);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
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
    fetchQuizQuestions();
  };

  const handlePlayerSubmit = (playerData) => {
    setPlayer(playerData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (quizQuestions.length === 0) {
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
              <Result score={score} totalQuestions={quizQuestions.length} />
              <button onClick={handleRestart}>Restart Quiz</button>
            </div>
          ) : (
            <div className="question-container">
              <div className="player-info">
                <img src={player.avatar} alt="Avatar" className="avatar" />
                <h2>{player.name}</h2>
              </div>
              <h3>Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
              <Question
                key={currentQuestionIndex}
                country={quizQuestions[currentQuestionIndex]}
                options={quizQuestions[currentQuestionIndex].options}
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
