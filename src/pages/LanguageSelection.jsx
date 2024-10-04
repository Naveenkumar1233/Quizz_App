import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const LanguageSelection = () => {
  
  const { setLanguage, setLanguageQuestions } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    setLanguage(language); // Set the selected language
    setLanguageQuestions(language); // Load questions for the selected language
    navigate("/quiz"); // Navigate to the quiz page
  };

  return (
    <div className="extra">
      <div className="container text-center">
        <h2>Select a Language</h2>
        <div>
          <button className="btn btn-primary" onClick={() => handleLanguageSelect("Python")}>
            Python
          </button>
          <button className="btn btn-secondary" onClick={() => handleLanguageSelect("JavaScript")}>
            JavaScript
          </button>
          <button className="btn btn-success" onClick={() => handleLanguageSelect("HTML")}>
            HTML
          </button>
          <button className="btn btn-info" onClick={() => handleLanguageSelect("CSS")}>
            CSS
          </button>
          <button className="btn btn-warning" onClick={() => handleLanguageSelect("React")}>
            React
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
