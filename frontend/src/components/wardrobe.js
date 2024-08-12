import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toggleNavbar from '../pages/Home/homePage';
import isOpen from '../pages/Home/homePage';


const Wardrobe = () => {
  const [clothes, setClothes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const addClothes = () => {
    if (selectedFile) {
      const newClothes = {
        id: clothes.length + 1,
        image: selectedFile
      };
      setClothes([...clothes, newClothes]);
      setSelectedFile(null);
    }
  };

  return (
    
    <div className="container">

<>
            <Navbar expand="lg" bg="white" className="shadow-sm fixed-top" style={{ height: '80px' }}>
                <Container>
                    <NavbarBrand href='#'>
                        <img src='img/tipografia.png' alt='Logo' style={{ height: '120px' }} />
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                    <NavbarCollapse in={isOpen}>
                        <Nav className="ms-auto" id="basic-navbar-nav">
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Login'>Login</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Cadastrar'>Cadastrar</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Dashboard'>Dashboard</Link>
                            </Nav.Item>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            
        </>
      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#roupas">Roupas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#looks">Looks</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#favoritos">Favoritos</a>
        </li>
      </ul>

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <input 
          type="file" 
          className="form-control mb-3" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        <button className="btn btn-dark create-button" onClick={addClothes}>Criar</button>
      </div>

      <div className="row">
        {clothes.map((clothing) => (
          <div key={clothing.id} className="col-4 mb-4">
            <div className="card">
              <img src={clothing.image} className="card-img-top" alt={`Clothing item ${clothing.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
    