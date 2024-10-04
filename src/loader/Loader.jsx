import React, { useEffect, useState } from 'react';
import App from '../App';
import './Loader.css'; 

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                </div>
            ) : (
                <App />
            )}
        </>
    );
};

export default Loader;
