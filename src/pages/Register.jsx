import React from 'react';
import './register.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Using the createUser functionality from store  
  const { createUser } = useAuth()
  const navigate = useNavigate()

  // Handling the form submission 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUser({ email, password })
      navigate("/login")
    } catch (error) {
      toast.error("User Not Registered")
    }
  }



  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" id="res_card">
      <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="firstname" className="form-label fw-bold">First Name</label>
            <input type="text" className="form-control" id="firstname" placeholder="First Name" required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastname" className="form-label fw-bold">Last Name</label>
            <input type="text" className="form-control" id="lastname" placeholder="Last Name" required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="terms" />
            <label className="form-check-label" htmlFor="terms">I agree to the terms & conditions</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-1">Register</button>

          <div className="text-center mt-3">
            <NavLink to={"/login"} className="text-decoration-none">Already have an account? Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
