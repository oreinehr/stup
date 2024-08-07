import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validaLogin from './LoginValidação';

function Login() {
    const [values, setValues] = useState({
        crp: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validaLogin(values));
        console.log('enviado');
    };
    
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded h-70 '>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='crp'><strong>CRP</strong></label>
                        <input type='text' name='crp' onChange={handleInput} placeholder='CRP do Profissional' className='form-control rounded-0' />
                        <span>{errors.crp && <span className='text-danger' > {errors.crp} </span> }</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Senha</strong></label>
                        <input type='password' name='password' onChange={handleInput} placeholder='Senha' className='form-control rounded-0' />
                        <span>{errors.password && <span className='text-danger' > {errors.password} </span> }</span>
                    </div>
                    <button type='submit' className='btn btn-success w-100'> <strong>Login</strong></button>
                    <p className='pt-3 small' >Ludemo.com a melhor plataforma de auxilio profissional.</p>
                    <Link to="/Cadastrar" className='btn btn-default border w-100 bg-light text-decoration-none'>Cadastrar</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;