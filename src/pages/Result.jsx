import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';

const Result = () => {
  const { score, questions, setScore } = useContext(QuizContext);
  const navigate = useNavigate();

  const { innerWidth: width, innerHeight: height } = window;
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Add class to body when confetti is shown
    document.body.classList.add('no-overflow');

    const timeout = setTimeout(() => {
      setShowConfetti(false); // Stop showing confetti after 5 seconds
      document.body.classList.remove('no-overflow'); // Remove class after confetti stops
    }, 8000); // Duration for confetti effect

    return () => {
      clearTimeout(timeout); // Clean up on unmount
      document.body.classList.remove('no-overflow'); // Clean up class if component unmounts
    };
  }, []);

  return (
    <div className="extra">
      <div className="container text-center">
        {showConfetti && <Confetti width={width} height={height} />}
        <h2 className="mt-4">Congratulations!</h2>
        <h3>You scored {score} out of {questions.length}</h3>
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={() => navigate("/review")}>
            Check Answers
          </button>
          <button className="btn btn-secondary" onClick={() => { setScore(0); navigate("/"); }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
