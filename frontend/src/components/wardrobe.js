// src/components/Wardrobe.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageLook from './imageLook';

const Wardrobe = () => {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('casaco');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userId] = useState(localStorage.getItem('userId') || '');
  const [isOpen, setIsOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageWithoutBg, setImageWithoutBg] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const REMOVE_BG_API_KEY = process.env.REACT_APP_REMOVE_BG_API_KEY;

  

    useEffect(() => {
      const fetchRoupas = async () => {
        if (!userId) {
          console.error('Usuário não identificado.');
          return;
        }
    
        try {
          const response = await axios.get(`http://localhost:8080/roupas/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
    
          if (response.status === 200) {
            setClothes(response.data);
            setFilteredClothes(response.data);
          }
        } catch (error) {
          if (error.response?.status === 404) {
            // Se o backend retorna 404, apenas considere as listas vazias.
            setClothes([]);
            setFilteredClothes([]);
          } else {
            console.error('Erro ao carregar roupas:', error);
            alert('Erro ao carregar roupas. Tente novamente mais tarde.');
          }
        }
      };
    
      fetchRoupas();
    }, [userId]);
    

  useEffect(() => {
    setFilteredClothes(
      selectedCategory
        ? clothes.filter((item) => item.category === selectedCategory)
        : clothes
    );
  }, [clothes, selectedCategory]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo é muito grande. Escolha um arquivo menor que 5MB.');
      return;
    }
  
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Formato de arquivo inválido. Apenas JPEG e PNG são suportados.');
      return;
    }
  
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    processImage(file);
  };

  const processImage = async (file) => {
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: { 'X-Api-Key': 'WJUxsp9sviKJwd4wJNxUNvqe' },
        responseType: 'blob',
      });

      if (response.status === 200) {
        setImageWithoutBg(URL.createObjectURL(response.data));
      } else {
        console.error('Erro na API remove.bg: ', response);
        alert('Erro ao processar a imagem.');
      }
    } catch (error) {
      console.error('Erro ao remover o fundo da imagem:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        cameraRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Erro ao acessar a câmera:', error);
        alert('Erro ao acessar a câmera. Verifique suas permissões.');
      });
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = cameraRef.current.videoWidth;
    canvas.height = cameraRef.current.videoHeight;
    canvas.getContext('2d').drawImage(cameraRef.current, 0, 0);
  
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
    setIsCameraOpen(false);
  
    processImage(dataURLtoFile(imageData, 'captured_image.png'));
  
    // Stop the video stream to release resources
    const stream = cameraRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };



  const addClothes = async () => {
    if (!imageWithoutBg && !selectedFile) {
      alert('Nenhuma imagem válida foi selecionada ou processada.');
      return;
    }
  
    if (!userId || !category) {
      alert('Usuário e categoria são obrigatórios.');
      return;
    }
  
    const formData = new FormData();
    const fileToUpload = imageWithoutBg
      ? await fetch(imageWithoutBg)
          .then((res) => res.blob())
          .then((blob) => new File([blob], 'image_without_bg.png', { type: 'image/png' }))
      : selectedFile;
  
    formData.append('image', fileToUpload);
    formData.append('userId', userId);
    formData.append('categoria', category);
  
    console.log('Dados enviados ao backend:', {
      userId,
      category,
      fileToUpload,
    });
  
    try {
      const response = await axios.post('http://localhost:8080/roupas/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Resposta completa do backend:', response.data);
  
      // Aqui, trate a resposta diretamente sem validações desnecessárias
      const roupa = response.data; // A resposta já contém o objeto esperado
  
      if (roupa && roupa.id) {
        setClothes((prevClothes) => [...prevClothes, roupa]); // Adiciona ao estado
        setShowAddModal(false);
        alert('Roupa adicionada com sucesso!');
      } else {
        console.error('Formato inesperado na resposta do backend:', response.data);
        alert('Erro ao adicionar roupa. Formato inesperado do servidor.');
      }
    } catch (error) {
      console.error('Erro na requisição ao servidor:', error.response?.data || error.message);
      alert('Erro ao adicionar roupa.');
    }
  };
  
  
  
  
  
  
  

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
    {/* Componente de imagem no topo */}
    <ImageLook src="3.png" alt="Imagem no topo" />
      <Navbar expand="lg" bg="white" className="shadow-sm fixed-top" style={{ height: '80px' }}>
        <Container>
          <Navbar.Brand href="#">
            <img src="img/tipografia.png" alt="Logo" style={{ height: '120px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsOpen(!isOpen)} />
          <Navbar.Collapse in={isOpen}>
            <Nav className="ms-auto" id="basic-navbar-nav">
              <Link className="nav-link p-2 text-dark" to="/">Home</Link>
              <Link className="nav-link p-2 text-dark" to="/GuardaRoupa">Guarda-Roupa</Link>
              <Link className="nav-link p-2 text-dark" to="/Look">Looks</Link>
              <Link className="nav-link p-2 text-dark" to="/Login">Login</Link>
              <Link className="nav-link p-2 text-dark" to="/Cadastrar">Cadastrar</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      


      <div className="d-flex justify-content-center">
        <Button variant="dark" onClick={() => setShowAddModal(true)} style={{ height: '8vh', marginTop: '7vh' }}>
          Adicionar Roupa
        </Button>
      </div>

      <div className="row mt-0">
        {filteredClothes.map((item) => (
          item?.imagem_url && (
            <div className="col-md-4 mb-5" key={item.roupa_id}>
              <div className="card shadow-sm">
                <img src={item.imagem_url} alt="Roupa" className="card-img-top" style={{ objectFit: 'cover', height: '250px' }} />
              </div>
            </div>
          )
        ))}
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Roupa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-5">
              <label htmlFor="file" className="form-label">Selecionar Imagem</label>
              <input type="file" className="form-control" id="file" onChange={handleFileChange} />
            <div className="mt-3">
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}
                {imageWithoutBg && <img src={imageWithoutBg} alt="Imagem sem fundo" style={{ maxWidth: '100%', height: 'auto' }} />}
            </div>
    
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Categoria</label>
              <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="casaco">Casaco</option>
                <option value="calca">Calça</option>
                <option value="camiseta">Camiseta</option>
              </select>
            </div>
            {isCameraOpen ? (
              <div>
                <video ref={cameraRef} autoPlay style={{ width: '100%', height: 'auto' }} />
                <Button variant="primary" onClick={captureImage}>Capturar Imagem</Button>
              </div>
            ) : (
              <Button variant="secondary" onClick={openCamera}>Abrir Câmera</Button>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={addClothes}>Adicionar Roupa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Wardrobe;
