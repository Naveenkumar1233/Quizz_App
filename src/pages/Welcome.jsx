import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="extra">
      <div className="container text-center center-content">
        <h1>Welcome to the Quiz App</h1>
        <button className="btn btn-primary wel-btn" onClick={() => navigate("/language")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
