import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Using the createUser functionality from store
  const { userLogin } = useAuth()
  const navigate = useNavigate()

  // Handling the form submission 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let success = await userLogin({ email, password })
      if (success) {
        navigate("/")
      }
    }
    catch (error) {
      toast.error("Failed To Login")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" id="login_card">
      <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Email" className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <NavLink to={"/reset"} className="text-decoration-none">Forgot password?</NavLink>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
          <div className="text-center mt-3">
            <NavLink to={"/register"} className="text-decoration-none">Don't have an account? Register</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

