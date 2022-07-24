import { React, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAuthenticated } from "../../services/auth";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import './style.css'

const CriarConta = () => {   
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated()){
            navigate('/home');
        }
    }, [navigate]);
    const { register, handleSubmit } = useForm();    

    const onSubmit = useCallback(async (formData) => {
        try{
            const res = await api.post("usuarios/", formData);
            if(res.status === 201){
                alert("Conta criada com sucesso.");
                navigate('/login');
            }
        }
        catch (err){
            alert("Ocorreu um erro, verifique o formulário.");
        }
      }, [navigate]);

    return (
        <div className="cadastro">
            <h1>Cadastro</h1>
            <form className="cadastro-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Informações de usuário:</h2>
                <div className="cadastro-form-inputs">
                    <input type="text" name="nome" placeholder="nome" {...register("nome", { required: true })}></input>
                    <input type="text" name="email" placeholder="e-mail" {...register("email", { required: true })}></input>
                    <input type="password" name="password" placeholder="senha" {...register("password")}></input>             
                </div>
                <h2>Documentos (apenas números):</h2>
                <div className="cadastro-form-inputs">
                    <input type="text" name="cpf" placeholder="CPF" {...register("cpf", { required: true })}></input>
                    <input type="text" name="pis" placeholder="PIS" {...register("pis", { required: true })}></input>     
                </div>
                <h2>Endereço:</h2>
                <div className="cadastro-form-inputs">  
                    <input type="text" name="pais" placeholder="país" {...register("endereco.pais", { required: true })}></input>
                    <input type="text" name="estado" placeholder="estado" {...register("endereco.estado", { required: true })}></input>
                    <input type="text" name="municipio" placeholder="município" {...register("endereco.municipio", { required: true })}></input>
                    <input type="text" name="cep" placeholder="CEP" {...register("endereco.cep", { required: true })}></input>
                    <input type="text" name="rua" placeholder="rua" {...register("endereco.rua", { required: true })}></input>  
                    <input type="text" name="numero" placeholder="número" {...register("endereco.numero", { required: true })}></input>            
                </div>
                <button type="submit">criar conta</button>  
                <br />
                <Link to="/login" className="login-link">Login</Link>
            </form>
        </div>
    )
}

export default CriarConta;