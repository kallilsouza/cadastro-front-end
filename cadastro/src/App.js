import { React, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

export default function App() {
   const navigate = useNavigate();
   useEffect(() => {
      if(!isAuthenticated()){
         navigate('/login');
      }
      else{
         navigate('/home');
      }
    }, [navigate]);
   return (
      <Link to="/login">Login</Link>
   );
}