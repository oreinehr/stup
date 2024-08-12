import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validaLogin from './LoginValidação';
import axios from 'axios';
import { LayoutComponents } from '../../components/layoutComponents/layoutComponents.js';
import '../../components/styles.css';


function Login() {
    const [values, setValues] = useState({
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const validationErrors = validaLogin(values);
        setErrors(validationErrors);
        console.log('Erros de Validação:', validationErrors);
        
        const hasErrors = Object.values(validationErrors).some(error => error !== '');

        if (!hasErrors) {
            try {
                const data = {
                    email: values.email,
                    senha: values.senha,
                };
                
                console.log('Enviando dados para o servidor:', data);
                const response = await axios.post('http://localhost:5000/Login', data);
                console.log('Usuário encontrado com sucesso:', response.data);

                setTimeout(() => {
                    navigate('/'); 
                }, 2000);
            } catch (error) {
                console.error('Erro ao autenticar usuário:', error);
            }
        } else {
            console.log('Formulário contém erros de validação.');
        }
    };

    return (
        <LayoutComponents>
             <img src='/img/tipografia.png' alt='Logo' className='logo' />
        <div className='login-form'>
            <div className='login-form-title'>
                <h2><strong>Login</strong></h2>
                <form className='login-form' action='' onSubmit={handleSubmit}>
                    <div className='wrap-input'>
                        <label className='form-label' htmlFor='email'><strong>Email</strong></label>
                        <input type='text' 
                        id='email' 
                        name='email' 
                        onChange={handleInput} 
                        placeholder='Email' 
                        className='input' />
                        <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                    </div>
                    <div className='wrap-input'>
                        <label className='form-label' htmlFor='senha'><strong>Senha</strong></label>
                        <input 
                        type='password' 
                        id='senha' 
                        name='senha' 
                        onChange={handleInput} 
                        placeholder='Senha' 
                        className='input' />
                        <span>{errors.senha && <span className='text-danger'>{errors.senha}</span>}</span>
                       
                    </div>
                    <button type='submit' className='login-form-btn'><strong>Login</strong></button>
                    <p className=' text small text-center m-4'>Style Up, Inc.</p>
                    <Link to="/Cadastrar" className='m-4 mb-2 small text-center text-decoration-none'>Cadastrar</Link>
                </form>
            </div>
        </div>
        </LayoutComponents>
    );
}

export default Login;
