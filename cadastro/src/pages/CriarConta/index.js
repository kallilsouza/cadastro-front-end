import { React, useEffect, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAuthenticated } from "../../services/auth";
import api from "../../services/api";
import './style.css'

const CriarConta = () => {   
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated()){
            navigate('/home');
        }
    }, [navigate]);
    const { register, handleSubmit, formState: errors, setError } = useForm();    

    const onSubmit = useCallback(async (formData) => {
        if(formData.password !== formData.password2){
            setError("password", {
                type: "validate",
                message: "As senhas devem ser iguais"
            });
        }
        try{
            const res = await api.post("usuarios/", formData);
            if(res.status === 201){
                alert("Conta criada com sucesso.");
                navigate('/login');
            }
        }
        catch (error){
            if(error.response.data.cpf){
                setError("cpf", {
                    type: "validate",
                    message: error.response.data.cpf,
                });
            }
            if(error.response.data.pis){
                setError("pis", {
                    type: "validate",
                    message: error.response.data.pis,
                });
            }
            if(error.response.data.email){
                setError("email", {
                    type: "validate",
                    message: error.response.data.email,
                });
            }
            alert("Ocorreu um erro, verifique o formulário.");
        }
      }, [navigate, setError]);

    return (
        <div className="cadastro">
            <h1>Cadastro</h1>
            <form className="cadastro-form" onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Informações de usuário</legend>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" placeholder="Maria da Silva" {...register("nome", { required: true })}></input><br />
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" placeholder="maria@email.com" {...register("email", { required: true })}></input><br />
                    {errors.errors?.email && (<div className="form-erro">{errors.errors?.email?.message}</div>)}
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" placeholder="1a952ad77q" {...register("password")}></input><br />
                    <label htmlFor="confirm-password">Confirmar</label>
                    <input type="password" name="confirm-password" placeholder="1a952ad77q" {...register("password2")}></input><br />                   
                    {errors.errors?.password && (<div className="form-erro">{errors.errors?.password?.message}</div>)}
                </fieldset>
                <fieldset>
                        <legend>Documentos (apenas números):</legend>
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" name="cpf" placeholder="64791138023" {...register("cpf", { required: true })}></input><br />
                        {errors.errors?.cpf && (<div className="form-erro">{errors.errors?.cpf?.message}</div>)}                        
                        <label htmlFor="pis">PIS</label>
                        <input type="text" name="pis" placeholder="04283359229" {...register("pis", { required: true })}></input>  
                        {errors.errors?.pis && (<div className="form-erro">{errors.errors?.pis?.message}</div>)}                           
                </fieldset>
                <fieldset>
                        <legend>Endereço:</legend>
                        <label htmlFor="pais">País</label>
                        <input type="text" name="pais" placeholder="Brasil" {...register("endereco.pais", { required: true })}></input><br />
                        <label htmlFor="estado">Estado</label>
                        <input type="text" name="estado" placeholder="São Paulo" {...register("endereco.estado", { required: true })}></input><br />
                        <label htmlFor="municipio">Município</label>
                        <input type="text" name="municipio" placeholder="Diadema" {...register("endereco.municipio", { required: true })}></input><br />
                        <label htmlFor="cep">CEP</label>
                        <input type="text" name="cep" placeholder="09910-720" {...register("endereco.cep", { required: true, maxLength: 8 })}></input><br />  
                        <label htmlFor="rua">Rua</label>
                        <input type="text" name="rua" placeholder="R. Manoel da Nóbrega" {...register("endereco.rua", { required: true })}></input>  <br />
                        <label htmlFor="numero">Número</label>
                        <input type="text" name="numero" placeholder="712" {...register("endereco.numero",{ required: true, maxLength: 15 })}></input>            
                </fieldset>
                <button type="submit">criar conta</button>  
                <br />
                <Link to="/login" className="login-link">Login</Link>
            </form>
        </div>
    )
}

export default CriarConta;