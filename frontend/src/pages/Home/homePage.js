import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return ( 
        <div className='d-flex flex-column justify-content-center align-items-center'>
    <h1>Home</h1>
    <div>
        <p>Faz tua HomePage aqui larissa</p>
    </div>
        <Link to='/Login'>Login</Link>
        <Link to='/Cadastrar'>Cadastrar</Link>
        <Link to='/Dashboard'>Dashboard</Link>

    </div>

     );
}

export default Home;