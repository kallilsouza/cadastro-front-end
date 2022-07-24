import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../../services/auth";
import './style.css'

const Home = () => {   
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div>
            <div>Not ready yet</div>
            <button onClick={handleLogout} id="logout-btn">logout</button>
        </div>
    )
}

export default Home;