import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//pages
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import GuardaRoupa from './pages/GuardaRoupa/GuardaRoupa.js';
import Home from './pages/Home/homePage'; 
import AddClothing from './components/addClothing';
import Video from './pages/Home/homePage.js'
import UserProfile from './components/UserProfile';
import Layout2 from './components/layout2.js';
import Cart from './components/Cart.js';
import HomePage2 from './components/HomePage2.js';
import Wardrobe from './components/wardrobe';
import Look from './pages/Look/Looks.js'

function App() {
  return (
    <div className='app'>
      <div className='border'>
        
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/Cadastrar' element={<Cadastro />}></Route>
            <Route path='/GuardaRoupa' element={<Wardrobe />}></Route>
            <Route path='/addClothing' element={<AddClothing />}></Route>
            <Route path='/Video' element={<Video />}></Route>
            <Route path='/UserProfile' element={<UserProfile/>}></Route>
            <Route path='/layout2' element={<Layout2 />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/HomePage2' element={<HomePage2 />}></Route>
            <Route path='/wardrobe' element={<Wardrobe />}></Route>
            <Route path ='/look' element={<Look />}></Route>
          </Routes>
        </BrowserRouter>  
      </div>
    </div>
    );
  }

export default App;