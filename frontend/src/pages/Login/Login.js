
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutComponents } from '../../components/layoutComponents/layoutComponents.js';
import '../../components/styles.css';


const api_url = process.env.REACT_APP_BASE_URL


function Login() {
    const [values, setValues] = useState({
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState({});
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            email: values.email,
            senha: values.senha,
        };
    
        try {
            const response = await axios.post('http://localhost:8080/login', data);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                navigate('/');
            } else {
                setMensagemErro('Usuário não encontrado, verifique as credenciais.');
            }
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
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
