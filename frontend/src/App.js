import React from 'react';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from './Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Cadastrar' element={<Cadastro />}></Route>
      </Routes>
    </BrowserRouter>
       
  );
}

export default App;
