import React, { useEffect, useState } from 'react';
import Quiz from './components/Quiz';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies');
        const countriesData = response.data.filter(country => country.capital && country.capital.length > 0);
        const shuffledCountries = shuffleArray(countriesData).slice(0, 10);
        const questions = shuffledCountries.map(country => ({
          ...country,
          options: generateOptions(country, countriesData)
        }));
        setQuizQuestions(questions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Capital Quiz</h1>
      </header>
      {loading ? <p>Loading...</p> : <Quiz questions={quizQuestions} />}
    </div>
  );
};

export default App;
