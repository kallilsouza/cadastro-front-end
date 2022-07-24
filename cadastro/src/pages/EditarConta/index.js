import { React, useCallback, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../services/auth";
import './style.css'

const EditarConta = () => {   
    const { register, handleSubmit, formState: errors, setError } = useForm();   
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    const userId = getUserId();

    const onSubmit = useCallback(async (formData) => {        
        if(formData.password !== formData.password2){
            setError("password", {
                type: "validate",
                message: "As senhas devem ser iguais"
            });
            return;
        }
        delete formData.password2;
        if(formData.password === ''){
            delete formData.password;
        }
        try{
            const res = await api.patch(`usuarios/${userId}/`, formData);
            if(res.status === 200){
                alert("Dados salvos com sucesso.");
                navigate('/home');
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
      }, [navigate, setError, userId]);

    useEffect(() => {
        api.get(`usuarios/${userId}`).then(res => {
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [userId]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div>
            <Header />
            {user && (
            <div className="edicao">
                <h1>Edição</h1>                
                    <form className="edicao-form" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <legend>Informações de usuário</legend>
                            <label htmlFor="nome">Nome</label>
                            <input 
                                type="text" 
                                name="nome" 
                                defaultValue={user?.nome} 
                                {...register("nome", { required: true })}>
                            </input><br />
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                defaultValue={user?.email}
                                {...register("email", { required: true })}>
                            </input><br />
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
                                <input 
                                    type="text" 
                                    name="cpf" 
                                    defaultValue={user?.cpf}
                                    {...register("cpf", { required: true })}>
                                </input><br />
                                {errors.errors?.cpf && (<div className="form-erro">{errors.errors?.cpf?.message}</div>)}                        
                                <label htmlFor="pis">PIS</label>
                                <input 
                                    type="text" 
                                    name="pis" 
                                    defaultValue={user?.pis}
                                    {...register("pis", { required: true })}>
                                </input>  
                                {errors.errors?.pis && (<div className="form-erro">{errors.errors?.pis?.message}</div>)}                           
                        </fieldset>
                        <fieldset>
                                <legend>Endereço:</legend>
                                <label htmlFor="pais">País</label>
                                <input 
                                    type="text" 
                                    name="pais" 
                                    defaultValue={user?.endereco?.pais}
                                    {...register("endereco.pais", { required: true })}>
                                </input><br />
                                <label htmlFor="estado">Estado</label>
                                <input 
                                    type="text" 
                                    name="estado" 
                                    defaultValue={user?.endereco?.estado}
                                    {...register("endereco.estado", { required: true })}>
                                </input><br />
                                <label htmlFor="municipio">Município</label>
                                <input 
                                    type="text" 
                                    name="municipio" 
                                    defaultValue={user?.endereco?.municipio}
                                    {...register("endereco.municipio", { required: true })}>
                                </input><br />
                                <label htmlFor="cep">CEP</label>
                                <input 
                                    type="text" 
                                    name="cep" 
                                    defaultValue={user?.endereco?.cep}
                                    {...register("endereco.cep", { required: true, maxLength: 8 })}>
                                </input><br />  
                                <label htmlFor="rua">Rua</label>
                                <input 
                                    type="text" 
                                    name="rua" 
                                    defaultValue={user?.endereco?.rua}
                                    {...register("endereco.rua", { required: true })}>
                                </input>  <br />
                                <label htmlFor="numero">Número</label>
                                <input 
                                    type="text" 
                                    name="numero" 
                                    defaultValue={user?.endereco?.numero}
                                    {...register("endereco.numero",{ required: true, maxLength: 15 })}>
                                </input>            
                        </fieldset>
                        <button type="submit">salvar</button>  
                        <br />
                    </form>                                
            </div>
            )}
        </div>
    )
}

export default EditarConta;