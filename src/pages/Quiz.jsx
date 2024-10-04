import React, { useEffect, useState, useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { questions, answers, setAnswers, setScore, setTotalTime, totalTime } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks which question the user is on
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    // Confirmation dialog for page refresh
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Are you sure you want to leave this page? Your progress will not be saved.";
      event.returnValue = confirmationMessage; // Standard for most browsers
      return confirmationMessage; // For some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      // Redirect to home if there are no questions (on refresh)
      navigate("/");
    }
  }, [questions, navigate]);

  // Start the timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(); // Automatically submit when time is up
          return 0; // Stop the timer when it reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    setTotalTime(300 - timeLeft); // Set total time taken
  }, [timeLeft, setTotalTime]);

  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
    setErrorMessage(""); // Clear error message when selecting an option
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    window.scrollTo(0, 0); // Scroll to the top after moving to the next question
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    window.scrollTo(0, 0); // Scroll to the top after moving to the previous question
  };

  const handleSubmit = () => {
    // Calculate score based on answered questions only (unanswered questions = 0 points)
    const newScore = answers.filter((answer, index) => answer === questions[index].correct).length;

    // Store score and time in local storage
    setScore(newScore);
    localStorage.setItem('quizScore', newScore);
    localStorage.setItem('totalTime', totalTime); // Use totalTime from context
    localStorage.setItem('quizAnswers', JSON.stringify(answers)); // Store answers as a string
    localStorage.setItem('quizQuestions', JSON.stringify(questions)); // Store questions as a string

    navigate("/result"); // Navigate to result page
  };

  // If there are no questions yet, display a loading message
  if (questions.length === 0) {
    return (
      <div>Loading questions... If this takes too long, <button onClick={() => navigate("/")}>try again</button>.</div>
    );
  }

  // Format time left for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="extra">
      <div className="container text-center">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <h3>Time Left: {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</h3>
        {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message */}
        <div className="question-card p-4 mb-4 border rounded">
          <h4>{questions[currentQuestionIndex]?.question}</h4>
          <div className="options">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <div
                key={option}
                tabIndex={0} // Make the div focusable
                role="button"
                onKeyPress={(e) => e.key === "Enter" && handleOptionClick(option)} // Trigger on Enter key
                className={`option p-2 mb-2 border rounded cursor-pointer ${answers[currentQuestionIndex] === option ? "bg-primary text-white" : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="navigation">
            {currentQuestionIndex > 0 && (
              <button className="btn btn-secondary me-2 quiz-btn" onClick={handlePrevious}>Previous</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button className="btn btn-primary quiz-btn" onClick={handleNext}>Next</button>
            ) : (
              <button className="btn btn-success quiz-btn" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
