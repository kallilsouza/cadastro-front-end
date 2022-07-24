import { React, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Header from '../../components/Header';
import { isAuthenticated, getUsername } from "../../services/auth";
import './style.css'

const Home = () => {   
    const navigate = useNavigate();
    const username = getUsername();
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/login');
        }
    }, [navigate]);

    return (
        // <div>
        //     <div>{ username }</div>
        //     <button onClick={handleLogout} id="logout-btn">logout</button>
        // </div>
        <div>
            <Header />
            <div className="home-content">
                <h1>Olá, {username}!</h1>
                <div className="links">
                    <Link to="/editar-conta">Editar informações de cadastro</Link>
                </div>                
            </div>            
        </div>
    )
}

export default Home;