import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import '../../components/styles.css';
import videotcc from '../../img/videotcc.mp4';
import Layout2 from '../../components/layout2.js';
import HomePage2 from '../../components/HomePage2.js';

function Video() {
    return (
        <div className='video-container'>
            <video src={videotcc} autoPlay loop muted />
        </div>
    );
}

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar expand="lg" bg="white" className="shadow-sm py-3 px-4 fixed-top" style={{ height: '80px' }}>
                <Container>
                    <NavbarBrand href='#'>
                        <img src='img/tipografia.png' alt='Logo' style={{ height: '120px' }} />
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                    <NavbarCollapse in={isOpen}>
                        <Nav className="ms-auto" id="basic-navbar-nav">
                        <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/GuardaRoupa'>Guarda-Roupa</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Look'>Looks</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Login'>Login</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className='nav-link p-2 text-dark' to='/Cadastrar'>Cadastrar</Link>
                            </Nav.Item>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            
            <div className="video-container">
                <Video />
            </div>

            <div className=''>
                <HomePage2 />
            </div>

           <div className='video-container'>
                <Layout2 />
           </div>
        </>
    );
}
