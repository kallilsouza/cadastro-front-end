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
                <fieldset>
                    <legend>Informações de usuário</legend>
                    <label for="nome">Nome</label>
                    <input type="text" name="nome" placeholder="Maria da Silva" {...register("nome", { required: true })}></input><br />
                    <label for="email">E-mail</label>
                    <input type="text" name="email" placeholder="maria@email.com" {...register("email", { required: true })}></input><br />
                    <label for="senha">Senha</label>
                    <input type="password" name="password" placeholder="1a952ad77q" {...register("password")}></input>           
                </fieldset>
                <fieldset>
                        <legend>Documentos (apenas números):</legend>
                        <label for="cpf">CPF</label>
                        <input type="text" name="cpf" placeholder="64791138023" {...register("cpf", { required: true })}></input><br />
                        <label for="pis">PIS</label>
                        <input type="text" name="pis" placeholder="04283359229" {...register("pis", { required: true })}></input>     
                </fieldset>
                <fieldset>
                        <legend>Endereço:</legend>
                        <label for="pais">País</label>
                        <input type="text" name="pais" placeholder="Brasil" {...register("endereco.pais", { required: true })}></input><br />
                        <label for="estado">Estado</label>
                        <input type="text" name="estado" placeholder="São Paulo" {...register("endereco.estado", { required: true })}></input><br />
                        <label for="municipio">Município</label>
                        <input type="text" name="municipio" placeholder="Diadema" {...register("endereco.municipio", { required: true })}></input><br />
                        <label for="cep">CEP</label>
                        <input type="text" name="cep" placeholder="09910-720" {...register("endereco.cep", { required: true })}></input><br />
                        <label for="rua">Rua</label>
                        <input type="text" name="rua" placeholder="R. Manoel da Nóbrega" {...register("endereco.rua", { required: true })}></input>  <br />
                        <label for="numero">Número</label>
                        <input type="text" name="numero" placeholder="712" {...register("endereco.numero", { required: true })}></input>            
                </fieldset>
                <button type="submit">criar conta</button>  
                <br />
                <Link to="/login" className="login-link">Login</Link>
            </form>
        </div>
    )
}

export default CriarConta;