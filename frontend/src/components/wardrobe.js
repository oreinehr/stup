import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';

const Wardrobe = () => {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('casaco');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [isOpen, setIsOpen] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const REMOVE_BG_API_KEY = '284y7ebCKWaJEscA6xhpMpLb'; 

  useEffect(() => {
    const fetchRoupas = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/roupas/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setClothes(response.data);
          setFilteredClothes(response.data);
        } catch (error) {
          console.error('Erro ao carregar roupas:', error);
        }
      }
    };
    fetchRoupas();
  }, []);

  useEffect(() => {
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

  const removeBackground = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': '284y7ebCKWaJEscA6xhpMpLb',
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      return URL.createObjectURL(response.data); // Retorna a URL da imagem sem fundo
    } catch (error) {
      console.error('Erro ao remover fundo da imagem:', error);
      return null;
    }
  };

  const addClothes = async () => {
    if (!userId) {
      console.error('User ID is required before adding clothes.');
      return;
    }

    const formData = new FormData();
    let processedImage = null;

    if (selectedFile) {
      processedImage = await removeBackground(selectedFile);
      formData.append('image', selectedFile);
    } else if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      processedImage = await removeBackground(blob);
      formData.append('image', blob, 'captured_image.png');
    }

    formData.append('userId', userId);
    formData.append('categoria', category);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const newClothing = {
          id: clothes.length + 1,
          image: processedImage || result.imagem_url, // Adiciona a imagem processada ou a original
          category
        };
        setClothes([...clothes, newClothing]);

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
    setCapturedImage(null);
    setShowCameraModal(false);
    setIsImageCaptured(false); // Resetar a pré-visualização
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsImageCaptured(false); // Permite capturar novas imagens
      })
      .catch((err) => console.error('Erro ao acessar a câmera:', err));
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCapturedImage(dataUrl);
    setIsImageCaptured(true); // Define que a imagem foi capturada

    // Parar o stream da câmera
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  };

  const retakePhoto = () => {
    setIsImageCaptured(false);
    setCapturedImage(null);
    startCamera(); // Reinicia a câmera
  };

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

      {/* Camera Section with Modal */}
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Button className="btn btn-dark" onClick={() => { setShowCameraModal(true); startCamera(); }}>
          Tirar Foto
        </Button>
      </div>

      {/* Modal for Camera */}
      <Modal show={showCameraModal} onHide={() => setShowCameraModal(false)} centered>
        <Modal.Body className="p-0">
          <div className="camera-overlay-container">
            <div className="camera-frame">
              {isImageCaptured ? (
                <img
                  src={capturedImage}
                  alt="Pré-visualização"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <video ref={videoRef} width="100%" height="100%" style={{ objectFit: 'cover' }}></video>
              )}
              <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
            <div className="camera-instructions text-center">
              {isImageCaptured ? (
                <h5>Pré-visualização</h5>
              ) : (
                <h5>Posicione a roupa e capture a imagem</h5>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          {isImageCaptured ? (
            <>
              <Button className="btn btn-dark" onClick={retakePhoto}>
                Tirar Nova Foto
              </Button>
              <Button className="btn btn-primary" onClick={addClothes}>
                Confirmar
              </Button>
            </>
          ) : (
            <Button className="btn btn-dark" onClick={captureImage}>
              Capturar Foto
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Formulário para adicionar nova roupa */}
      <div className="form-group">
        <label htmlFor="category">Escolha uma categoria:</label>
        <select className="form-control" id="category" value={category} onChange={handleCategoryChange}>
          <option value="casaco">Casaco</option>
          <option value="calca">Calça</option>
          <option value="camiseta">Camiseta</option>
          <option value="acessorio">Acessório</option>
        </select>

        <input type="file" onChange={handleFileChange} className="form-control mt-2" />

        <Button className="btn btn-primary mt-2" onClick={addClothes}>
          Adicionar Roupa
        </Button>
      </div>

      {/* Filtros por categoria */}
      <div className="form-group mt-2">
        <label htmlFor="filterCategory">Filtrar por categoria:</label>
        <select className="form-control" id="filterCategory" value={selectedCategory} onChange={handleFilterCategoryChange}>
          <option value="">Todas as Categorias</option>
          <option value="casaco">Casaco</option>
          <option value="calca">Calça</option>
          <option value="camiseta">Camiseta</option>
          <option value="acessorio">Acessório</option>
        </select>
      </div>

      {/* Exibição das roupas filtradas */}
      <div className="row mt-4">
        {filteredClothes.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card shadow-sm">
              <img
                src={item.image || item.imagem_url}
                alt="Roupa"
                className="card-img-top"
                style={{ objectFit: 'cover', height: '250px' }}
              />
              <div className="card-body">
                <p className="card-text">Categoria: {item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
