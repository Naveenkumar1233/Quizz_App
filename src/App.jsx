import { Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Welcome from "./pages/Welcome";
import LanguageSelection from "./pages/LanguageSelection";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import AnswerReview from "./pages/AnswerReview";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useLocation } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";


function App() {

  const navlocation = useLocation()

  // Paths where navbar should not appear
  let navPath = ["/login", "/register", "/reset"]

  let hideNavbar = navPath.includes(navlocation.pathname)


  return (
    <>
      {!hideNavbar && <Navbar />}
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/language"
            element={
              <PrivateRoute>
                <LanguageSelection />
              </PrivateRoute>
            }
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/review" element={<AnswerReview />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </QuizProvider>
    </>
  );
}

export default App;
