import React, { createContext, useState } from "react";

// Create a context
export const QuizContext = createContext();

// Create a provider component
export const QuizProvider = ({ children }) => {
  const [language, setLanguage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // New state for total time

  // Questions for each language
  const allQuestions = {
    Python: [
      {
        question: "What is the output of print(2 ** 3)?",
        options: ["8", "6", "9", "4"],
        correct: "8",
      },
      {
        question: "Which of the following is not a valid variable name?",
        options: ["_var", "var_1", "1var", "var1"],
        correct: "1var",
      },
      {
        question: "What is the keyword used to create a function in Python?",
        options: ["function", "def", "create", "func"],
        correct: "def",
      },
      {
        question: "Which of the following data types is immutable?",
        options: ["list", "set", "dictionary", "tuple"],
        correct: "tuple",
      },
      {
        question: "What is the correct way to handle exceptions in Python?",
        options: ["try-catch", "try-except", "catch", "except-try"],
        correct: "try-except",
      },
    ],
    JavaScript: [
      {
        question: "Which of the following is a JavaScript data type?",
        options: ["String", "Boolean", "Undefined", "All of the above"],
        correct: "All of the above",
      },
      {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["The global object", "The current object", "The parent object", "None of the above"],
        correct: "The current object",
      },
      {
        question: "Which function is used to parse a string to an integer in JavaScript?",
        options: ["parseInt()", "Integer.parseInt()", "int()", "Number()"],
        correct: "parseInt()",
      },
      {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "create myFunction()", "myFunction: function()"],
        correct: "function myFunction()",
      },
      {
        question: "What is the output of console.log(0.1 + 0.2 === 0.3)?",
        options: ["true", "false", "undefined", "NaN"],
        correct: "false",
      },
    ],
    HTML: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlink Text Markup Language", "None of the above"],
        correct: "Hyper Text Markup Language",
      },
      {
        question: "Which tag is used to define an internal style sheet?",
        options: ["<css>", "<style>", "<script>", "<styles>"],
        correct: "<style>",
      },
      {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<br>", "<break>", "<lb>", "<newline>"],
        correct: "<br>",
      },
      {
        question: "Which attribute is used to specify the URL of an image?",
        options: ["src", "href", "url", "link"],
        correct: "src",
      },
      {
        question: "What is the correct HTML for creating a hyperlink?",
        options: ["<a href='url'>Link</a>", "<link='url'>Link</link>", "<a url='url'>Link</a>", "<a>Link</a>"],
        correct: "<a href='url'>Link</a>",
      },
    ],
    CSS: [
      {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: "Cascading Style Sheets",
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<style>", "<script>", "<styles>"],
        correct: "<style>",
      },
      {
        question: "Which property is used to change the font of an element?",
        options: ["font-family", "font-style", "text-font", "font-weight"],
        correct: "font-family",
      },
      {
        question: "How do you select an element with id 'myId' in CSS?",
        options: ["#myId", ".myId", "myId", "myid"],
        correct: "#myId",
      },
      {
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: "background-color",
      },
    ],
    React: [
      {
        question: "What is React primarily used for?",
        options: ["Building mobile applications", "Building web applications", "Building desktop applications", "All of the above"],
        correct: "Building web applications",
      },
      {
        question: "Which of the following is a state management tool for React?",
        options: ["Redux", "MobX", "Context API", "All of the above"],
        correct: "All of the above",
      },
      {
        question: "What is the purpose of the render() method in React?",
        options: ["To render the component to the DOM", "To create a new component", "To update the component state", "None of the above"],
        correct: "To render the component to the DOM",
      },
      {
        question: "What are props in React?",
        options: ["Properties passed to components", "State variables", "Methods of a component", "None of the above"],
        correct: "Properties passed to components",
      },
      {
        question: "How do you create a functional component in React?",
        options: ["function MyComponent() {}", "class MyComponent extends React.Component {}", "const MyComponent = () => {}", "All of the above"],
        correct: "All of the above",
      },
    ],
  };

  // Set questions based on selected language
  const setLanguageQuestions = (language) => {
    // console.log(`Setting questions for language: ${language}`);
    // console.log(allQuestions[language]); 
    setQuestions(allQuestions[language] || []);
    setAnswers(new Array(allQuestions[language]?.length).fill("")); // Reset answers for new questions
  };

  return (
    <QuizContext.Provider value={{
      language,
      setLanguage,
      questions,
      setLanguageQuestions,
      answers,
      setAnswers,
      score,
      setScore,
      totalTime,
      setTotalTime, 
    }}>
      {children}
    </QuizContext.Provider>
  );

};
