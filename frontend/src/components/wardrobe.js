import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Wardrobe = () => {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]); // Novo estado para roupas filtradas
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('casaco'); 
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para categoria filtrada
  const [userId, setUserId] = useState('1'); // Ajuste conforme necessário
  const [isOpen, setIsOpen] = useState(false); // Estado para o menu hambúrguer

  useEffect(() => {
    // Atualizar a lista de roupas filtradas com base na categoria selecionada
    if (selectedCategory === '') {
      setFilteredClothes(clothes);
    } else {
      setFilteredClothes(clothes.filter((item) => item.category === selectedCategory));
    }
  }, [clothes, selectedCategory]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addClothes = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('userId', userId);
      formData.append('categoria', category);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          const newClothing = { id: clothes.length + 1, image: result.imagem_url, category };
          setClothes([...clothes, newClothing]);

          // Atualizar as roupas filtradas com a nova roupa adicionada
          if (selectedCategory === '' || selectedCategory === category) {
            setFilteredClothes([...filteredClothes, newClothing]);
          }
        } else {
          const errorResult = await response.json();
          console.error('Erro ao adicionar roupa:', errorResult.message);
        }
      } catch (error) {
        console.error('Erro ao adicionar roupa:', error);
      }

      setSelectedFile(null);
    }
  };

  const toggleNavbar = () => setIsOpen(!isOpen); // Função para alternar o estado do menu hambúrguer

  return (
    <div className="container">
      <Navbar expand="lg" bg="white" className="shadow-sm fixed-top" style={{ height: '80px' }}>
        <Container>
          <NavbarBrand href='#'>
            <img src='img/tipografia.png' alt='Logo' style={{ height: '120px' }} />
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
          <NavbarCollapse in={isOpen}>
            <Nav className="ms-auto" id="basic-navbar-nav">
            <Nav.Item>
                <Link className='nav-link p-2 text-dark' to='/'>Home</Link>
            </Nav.Item>
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
      <div className="d-flex justify-content-center align-items-center flex-column">
        <input 
          type="file" 
          className="form-control mb-3" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        <select className="form-control mb-3" value={category} onChange={handleCategoryChange}>
          <option value="casaco">Casaco</option>
          <option value="camiseta">Camiseta</option>
          <option value="calça">Calça</option>
        </select>
        <button className="btn btn-dark create-button" onClick={addClothes}>Criar</button>
      </div>

      {/* Filtro de categoria */}
      <div className="mb-3">
        <select className="form-control" value={selectedCategory} onChange={handleFilterCategoryChange}>
          <option value="">Todas as Categorias</option>
          <option value="casaco">Casaco</option>
          <option value="camiseta">Camiseta</option>
          <option value="calça">Calça</option>
        </select>
      </div>

      <div className="row">
        {filteredClothes.map((clothing) => (
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
