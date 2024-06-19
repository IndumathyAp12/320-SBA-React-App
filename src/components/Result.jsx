import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const Result = ({ score, totalQuestions }) => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} out of {totalQuestions}</p>
    </div>
  );
};

export default Result;
