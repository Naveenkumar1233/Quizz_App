import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnswerReview = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    // Retrieve state from local storage
    const storedScore = localStorage.getItem('quizScore');
    const storedTime = localStorage.getItem('totalTime');
    const storedAnswers = localStorage.getItem('quizAnswers');
    const storedQuestions = localStorage.getItem('quizQuestions');

    if (storedScore) {
      setScore(Number(storedScore)); // Set stored score
    }

    if (storedTime) {
      setTotalTime(Number(storedTime)); // Set stored total time
    }

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers)); // Set stored answers
    }

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions)); // Set stored questions
    }

    // Navigate back to the Quiz if data is not available
    if (!storedScore || !storedAnswers || !storedQuestions) {
      navigate("/quiz");
    }
  }, [navigate]);

  // Array of unique styles for each question
  const uniqueStyles = [
    { backgroundColor: "#f8d7da", borderColor: "#f5c6cb" }, // Style for Question 1
    { backgroundColor: "#d4edda", borderColor: "#c3e6cb" }, // Style for Question 2
    { backgroundColor: "#d1ecf1", borderColor: "#bee5eb" }, // Style for Question 3
    { backgroundColor: "#fff3cd", borderColor: "#ffeeba" }, // Style for Question 4
    { backgroundColor: "#cce5ff", borderColor: "#b8daff" }, // Style for Question 5
  ];

  // Format total time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="extra">
      <div className="container text-center" style={{ padding: "20px" }}>
        <h2 className="mt-4">Your Score: {score} / {questions.length}</h2>
        <h4>Total Time Taken: {formatTime(totalTime)}</h4> {/* Display total time in min:sec format */}
        <div className="review-questions" style={{ maxHeight: "70vh", overflowY: "auto", textAlign: "left" }}>
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correct;
            const isNotAnswered = userAnswer === undefined || userAnswer === ""; // Check if unanswered

            return (
              <div
                key={index}
                className="question-review mb-3 position-relative"
                style={{
                  ...uniqueStyles[index % uniqueStyles.length], // Apply unique style based on index
                  border: "1px solid",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {/* "Not Answered" label */}
                {isNotAnswered && (
                  <span
                    className="position-absolute"
                    style={{
                      color: "red",
                      top: "-2px",
                      right: "10px",
                      fontWeight: "bold",
                      fontSize:"13px"
                    }}
                  >
                    Not Answered
                  </span>
                )}
                <h4 className="question-text">{question.question}</h4>
                <div className="options text-center">
                  {question.options.map((option, optIndex) => {
                    const isSelected = userAnswer === option;
                    const isCorrectOption = option === question.correct;

                    return (
                      <div
                        key={optIndex}
                        className={`option ${isSelected ? (isCorrect ? "bg-success text-white" : "bg-danger text-white") : (isCorrectOption ? "bg-success text-white" : "")}`}
                        style={{ textAlign: "center", padding: "10px", margin: "5px 0" }}
                        role="alert"
                        aria-live="assertive"
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-primary mt-3 wel-btn" onClick={() => navigate("/")}>Reset</button>
      </div>
    </div>
  );
};

export default AnswerReview;
