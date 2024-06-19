import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name,capital,currencies')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Capital Quiz</h1>
      </header>
      {loading ? <p>Loading...</p> : <Quiz countries={countries} />}
    </div>
  );
};

export default App;
