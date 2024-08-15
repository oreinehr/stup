import React, { useState, useEffect } from 'react';
import '../../components/styles.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTrash } from 'react-icons/fa';

function Looks() {
  const [clothes, setClothes] = useState([]);
  const [selectedLooks, setSelectedLooks] = useState([]);

  useEffect(() => {
    // Fetching the clothes from the "Guarda-Roupa"
    fetch('http://localhost:5000/Guarda-Roupa') // Atualize com a URL correta para obter as roupas do guarda-roupa
      .then(response => response.json())
      .then(data => setClothes(data))
      .catch(error => console.error('Erro ao carregar as roupas:', error));
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const dragImage = selectedLooks[dragIndex];
    const updatedImages = [...selectedLooks];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    setSelectedLooks(updatedImages);
  };

  const removeImage = (id) => {
    setSelectedLooks(selectedLooks.filter(image => image.id !== id));
  };

  return (
    <div>
      <Navbar expand="lg" bg="white" className="shadow-sm py-3 px-4 fixed-top" style={{ height: '80px' }}>
        <Container>
          <NavbarBrand href='#'>
            <img src='img/tipografia.png' alt='Logo' style={{ height: '120px' }} />
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse>
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

      <DndProvider backend={HTML5Backend}>
        <div className="looks-container">
          <h2 className="looks-title">Looks</h2>
          <div className="drop-zone">
            {clothes.length === 0 ? (
              <p>Nenhuma roupa disponível no guarda-roupa.</p>
            ) : (
              clothes.map((clothing, index) => (
                <ImageItem
                  key={clothing.id}
                  index={index}
                  image={clothing}
                  moveImage={moveImage}
                  removeImage={removeImage}
                  setSelectedLooks={setSelectedLooks}
                  selectedLooks={selectedLooks}
                />
              ))
            )}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

function ImageItem({ image, index, moveImage, removeImage, setSelectedLooks, selectedLooks }) {
  const ref = React.useRef(null);

  const [, drag] = useDrag({
    type: 'image',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'image',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const addToLook = () => {
    if (!selectedLooks.find(item => item.id === image.id)) {
      setSelectedLooks([...selectedLooks, image]);
    }
  };

  drag(drop(ref));

  return (
    <div ref={ref} className="look-item-container" onClick={addToLook}>
      <img
        src={image.url}
        alt={`Look ${index}`}
        className="look-item"
        draggable="false"
      />
      <FaTrash 
        onClick={() => removeImage(image.id)} 
        className="remove-look-icon" 
        title="Remover"
        size={14} 
        color="red"
      />
    </div>
  );
}

export default Looks;
