import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import CadastroValidacao from './CadastroValidacao.js';
import axios from 'axios';

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

                const response = await axios.post('http://localhost:5000/cadastro', data);
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
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded h-85'>
                <h2 className=''>Cadastro De Profissional</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='text' placeholder='Email' onChange={handleInput} name='email' className='form-control rounded-0' />
                        <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='nome'><strong>Nome</strong></label>
                        <input type='text' placeholder='Nome' onChange={handleInput} name='nome' className='form-control rounded-0' />
                        <span>{errors.nome && <span className='text-danger'>{errors.nome}</span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='senha'><strong>Senha</strong></label>
                        <p style={{ fontSize: '12px' }}>A senha deve conter pelo menos 8 caracteres.</p>
                        <input type='password' placeholder='Senha do Profissional' onChange={handleInput} name='senha' className='form-control rounded-0' />
                        <span>{errors.senha && <span className='text-danger'>{errors.senha}</span>}</span>
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Cadastrar</strong></button>
                    <p className='pt-3 small'>Ludemo.com a melhor plataforma de auxilio profissional.</p>
                    
                </form>
                <p className='text-success'>{mensagem}</p>
                <Link to="/Login" className='btn bt-primary border w-100'>Retornar para Login</Link>
            </div>
        </div>
    );
}

export default Cadastro;
