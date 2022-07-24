import { React, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, isAuthenticated } from "../../services/auth";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import './style.css'

const Login = () => {   
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated()){
            navigate('/home');
        }
    }, [navigate]);
    const { register, handleSubmit } = useForm();    

    const onSubmit = useCallback(async (formData) => {
        try{
            const { data } = await api.post("login/", formData);
            login(data);
            navigate('/home');
        }
        catch{
            alert("Credenciais inválidas")
        }
      }, [navigate]);

    return (
        <div className="login">
            <h1>Olá visitante</h1>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-form-inputs">
                    <input type="text" name="login" placeholder="E-mail, CPF ou PIS" {...register("login", { required: true })}></input>
                    <input type="password" name="password" placeholder="senha" {...register("password")}></input>                    
                </div>
                <button type="submit">login</button>  
                <br />
                <Link to="/criar-conta" className="criar-conta-link">Criar conta</Link>
            </form>
        </div>
    )
}

export default Login;