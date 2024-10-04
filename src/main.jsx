import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "react-toastify/dist/ReactToastify.css"
import AuthContext from './store/AuthContext.jsx';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import Loader from './loader/Loader.jsx';

createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
            <AuthContext>
                <Loader />
                <ToastContainer />
            </AuthContext>
        </BrowserRouter>
    </>

)
