import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Navbar = () => {

    const { isLoggedIn, isloading, signOut } = useAuth()


    const handleSignout = async () => {
        try {
            let success = await signOut()
            if (success) {
                console.log("User Logged Out")
            }
            else {
                console.log("Failed To LogOut")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isloading) {
        return null;
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" style={{ backgroundColor: "#eaeeff" }}>
                <div className="container-fluid d-flex justify-content-between">
                    <NavLink className="navbar-brand fs-5" to={"/"}>Quiz<span style={{ color: "red" }}>App</span></NavLink>
                    {isLoggedIn ? (
                        <button className='lobtn' onClick={() => handleSignout()}>Logout</button>
                    ) : (
                        <NavLink to={"/login"} className='lgbtn'>Login</NavLink>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
