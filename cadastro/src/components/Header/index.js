import { React } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css'
import { logout } from "../../services/auth";


const Header = () => {   
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
      };
    return (
        <>
            <header className="header">
                <button onClick={handleLogout} id="logout-btn">logout</button>
            </header>
        </>        
    )
}

export default Header;