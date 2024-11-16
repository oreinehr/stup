import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import CadastroValidacao from './CadastroValidacao.js';
import axios from 'axios';
import { LayoutComponents } from '../../components/layoutComponents/layoutComponents.js';
import '../../components/styles.css';



function Cadastro() {

    const [mensagem, setMensagem] = useState('');

    const [values, setValues] = useState({
        email: '',
        nome: '',
        senha: ''
    });
    const [errors, setErrors] = useState({});
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };


    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = CadastroValidacao(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const data = {
                    email: values.email,
                    nome: values.nome,
                    senha: values.senha,
                 
                };

                await axios.post('http://localhost:8080/cadastro', data);
                setMensagem('Cadastro realizado! Redirecionando para a página de login...');
                alert('Cadastro realizado com sucesso!');
                
                setTimeout(() => {
                    navigate('/Login'); 
                }, 2000);

            }
            catch (error) {
                console.error('Erro ao cadastrar:', error);
                alert('Deu erro aqui !');

            }
        }
    };

    return (
        <LayoutComponents>
    <img src='/img/tipografia.png' alt='Logo' className='logo' />
        <div className='login-form'>
            <div className='login-form-title'>
                <h2 className=''>Cadastro</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='login-form'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='text' placeholder='Email' onChange={handleInput} name='email' className='input' />
                        <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor='nome'><strong>Nome</strong></label>
                        <input type='text' placeholder='Nome' onChange={handleInput} name='nome' className='input' />
                        <span>{errors.nome && <span className='text-danger'>{errors.nome}</span>}</span>
                    </div>
                    <div className='wrap-input'>
                        <label htmlFor='senha'><strong>Senha</strong></label>
                        <p style={{ fontSize: '12px' }}>A senha deve conter pelo menos 8 caracteres.</p>
                        <input type='password' placeholder='Senha' onChange={handleInput} name='senha' className='input	' />
                        <span>{errors.senha && <span className='text-danger'>{errors.senha}</span>}</span>
                    </div>
                    <button type='submit' className='login-form-btn'><strong>Cadastrar</strong></button>
                    <p className='m-4 mb-2 small text-center text-decoration-none'>Style Up, Inc.</p>
                    
                </form>
                <p className='text-success'>{mensagem}</p>
                <Link to="/Login" className='btn bt-primary border w-100'>Retornar para Login</Link>
            </div>
        </div>
        </LayoutComponents>
    );
}

export default Cadastro;
