import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Result = ({ score, totalQuestions }) => {
  const { width, height } = useWindowSize();
  let message;

  if (score >= 7) {
    message = 'Congratulations!';
  } else if (score >= 4) {
    message = 'Good try!';
  } else {
    message = 'Better luck next time!';
  }

  return (
    <div>
      {score >= 7 && <Confetti width={width} height={height} />}
      <h2>{message}</h2>
      <h3>
        You scored {score} out of {totalQuestions}
      </h3>
    </div>
  );
};

export default Result;
