

  import React, { useState } from 'react';
  import '../../components/styles.css';
  import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import { DndProvider, useDrag, useDrop } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';
  import { FaTrash } from 'react-icons/fa';  // Importando o ícone de lixeira

  function Looks() {
    const [images, setImages] = useState([]);
    
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const fileURLs = files.map(file => ({
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));
      
      setImages(prevImages => {
        const newImages = [...prevImages, ...fileURLs];
        return newImages.slice(0, 3);
      });
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      const fileURLs = files.map(file => ({
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }));

      setImages(prevImages => {
        const newImages = [...prevImages, ...fileURLs];
        return newImages.slice(0, 3);
      });
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const moveImage = (dragIndex, hoverIndex) => {
      const dragImage = images[dragIndex];
      const updatedImages = [...images];
      updatedImages.splice(dragIndex, 1);
      updatedImages.splice(hoverIndex, 0, dragImage);
      setImages(updatedImages);
    };

    const removeImage = (id) => {
      setImages(images.filter(image => image.id !== id));
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
            <input
              type="file"
              id="fileInput"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button className="add-look-button" onClick={() => document.getElementById('fileInput').click()}>
              Adicionar
            </button>
            <div
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {images.length === 0 ? (
                <p>Arraste e solte as imagens aqui</p>
              ) : (
                images.map((image, index) => (
                  <ImageItem
                    key={image.id}
                    index={index}
                    image={image}
                    moveImage={moveImage}
                    removeImage={removeImage}
                  />
                ))
              )}
            </div>
          </div>
        </DndProvider>
      </div>
    );
  }

  function ImageItem({ image, index, moveImage, removeImage }) {
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

    drag(drop(ref));

    return (
      <div ref={ref} className="look-item-container">
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
          size={20} 
          color="red"
        />
      </div>
    );
  }

  export default Looks;
