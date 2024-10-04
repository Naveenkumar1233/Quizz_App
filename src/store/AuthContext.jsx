import { useState, useEffect, createContext } from 'react'
import { auth } from '../services/firebaseConfig'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence,
    browserLocalPersistence, onAuthStateChanged, signOut as firebaseSignOut, sendPasswordResetEmail
} from "firebase/auth";
import { toast } from 'react-toastify';

// 1. creating the store
export const AuthContexts = createContext()

const AuthContext = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(null)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {

        const setAuthPersistence = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence)
            } catch (error) {
                console.log("Error in Setting the Persistence")
            }
        }

        setAuthPersistence()

        let unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setIsLoggedIn(true)
                setIsUserLogged(user)
            } else {
                // User is signed out
                setIsLoggedIn(false)
                setIsUserLogged(null)
            }

            setIsloading(false)
        });

        //Clean up function
        return () => unSubscribe()

    }, [])

    // 1. Creating The User
    const createUser = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Registered Successfully");
            return true;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email ID is already registered! Please login.");
            } else {
                toast.error("Registration Failed!");
            }
            return false;
        }
    }


    // 2.Login The User
    const userLogin = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Login Successfull");
            return true;
        } catch (error) {
            toast.error("Login Failed!");
            return false;
        }
    }

    // 3. Logout The User
    const signOut = async () => {
        try {
            await firebaseSignOut(auth)
            toast.success("Successfully Logged Out");
            return true;
        } catch (error) {
            toast.error("Unable To LogOut");
            return false;
        }
    }

    // 4. Restting the password
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success("Reset Mail Sent Successfully");
            return true;
        } catch (error) {
            toast.error("Failed To Send Reset Mail");
            return false;
        }
    }

    return (
        <AuthContexts.Provider value={{ createUser, userLogin, isLoggedIn, isUserLogged, isloading, signOut, resetPassword }}>
            {children}
        </AuthContexts.Provider>
    )
}

export default AuthContext
