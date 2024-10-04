import React from 'react'
import { useState } from 'react'
import "./login.css"
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    //State to hold the email given by user
    const [email, setEmail] = useState('')

    const {resetPassword} = useAuth()
    const navigate = useNavigate()

    // Handling the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await resetPassword(email)
            navigate("/login")
        } catch (error) {
            toast.error("Email Is Not Verified")
        }
    }


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-lg border-0" id="login_card" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="Email" className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Send</button>
                    <div className="text-center mt-3">
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
