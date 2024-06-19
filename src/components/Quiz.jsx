import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies')
      .then(response => {
        const countriesData = response.data;
        const shuffledCountries = shuffleArray(countriesData).slice(0, 10); // Limit to 10 questions
        const questions = shuffledCountries.map(country => ({
          ...country,
          options: shuffleArray([country.capital, ...getRandomCapitals(countriesData, country.capital)]).slice(0, 4)
        }));
        setQuizQuestions(questions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomCapitals = (countriesData, currentCapital) => {
    const filteredCapitals = countriesData
      .filter(country => country.capital && country.capital !== currentCapital)
      .map(country => country.capital);
    return shuffleArray(filteredCapitals).slice(0, 3);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (quizQuestions.length === 0) {
    return <p>No questions available</p>; 
  }

  return (
    <div>
      {showResult ? (
        <Result score={score} totalQuestions={quizQuestions.length} />
      ) : (
        <div>
          <h3>Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
          <Question
            country={quizQuestions[currentQuestionIndex]}
            options={quizQuestions[currentQuestionIndex].options}
            onAnswer={handleAnswer}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
