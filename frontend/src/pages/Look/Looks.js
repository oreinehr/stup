import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, NavbarBrand, Button, Modal, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './Look.css';

function Looks() {
  const [clothes, setClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lookTitle, setLookTitle] = useState('');
  const [savedLooks, setSavedLooks] = useState([]);
  const [clothesToAdd, setClothesToAdd] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLook, setSelectedLook] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/roupas/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setClothes(response.data);
      } catch (error) {
        console.error('Erro ao carregar roupas:', error);
      }
    };

    const fetchSavedLooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/looks/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSavedLooks(response.data);
      } catch (error) {
        console.error('Erro ao carregar looks salvos:', error);
      }
    };

    fetchClothes();
    fetchSavedLooks();
  }, [userId]);

  const addClothingToLook = (clothing) => {
    setSelectedClothes((prevSelected) => {
      if (prevSelected.length < 6 && !prevSelected.find((item) => item.id === clothing.id)) {
        return [...prevSelected, clothing];
      }
      return prevSelected;
    });
  };

  const removeClothingFromLook = (id) => {
    setSelectedClothes(selectedClothes.filter((item) => item.id !== id));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setClothesToAdd([]);
    setShowModal(false);
  };

  const handleAddSelectedClothes = () => {
    setSelectedClothes((prevSelected) => {
      const newSelected = [...prevSelected];
      clothesToAdd.forEach((item) => {
        if (newSelected.length < 6 && !newSelected.find((clothing) => clothing.id === item.id)) {
          newSelected.push(item);
        }
      });
      return newSelected;
    });
    handleCloseModal();
  };

  const toggleClothingSelection = (item) => {
    setClothesToAdd((prev) => {
      if (prev.find((clothing) => clothing.id === item.id)) {
        return prev.filter((clothing) => clothing.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleSaveLook = async () => {
    if (lookTitle.trim() !== '' && selectedClothes.length > 0) {
      console.log('Dados enviados para o servidor:', { title: lookTitle, clothes: selectedClothes.map(item => item.id) });
      try {
        const response = await axios.post('http://localhost:5000/looks', 
          { title: lookTitle, clothes: selectedClothes.map(item => item.id) }, 
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        console.log(response.data.message);
        setLookTitle('');
        setSelectedClothes([]);
        // Recarregar looks salvos
        const fetchSavedLooks = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/looks/${userId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setSavedLooks(response.data);
          } catch (error) {
            console.error('Erro ao carregar looks salvos:', error);
          }
        };
        fetchSavedLooks();
      } catch (error) {
        console.error("Erro ao salvar look:", error);
        alert("Erro ao salvar look. Tente novamente.");
      }
    } else {
      alert("Por favor, adicione um título e selecione roupas.");
    }
  };

  const handleShowDetailModal = (look) => {
    setSelectedLook(look);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedLook(null);
  };

  return (
    <div>
      <Navbar expand="lg" bg="white" className="shadow-sm py-3 px-4 fixed-top" style={{ height: '80px' }}>
        <Container>
          <NavbarBrand href="#">
            <img src='img/tipografia.png' alt='Logo' style={{ height: '120px' }} />
          </NavbarBrand>
          <Nav className="ms-auto">
            <Link className='nav-link p-2 text-dark' to='/GuardaRoupa'>Guarda-Roupa</Link>
            <Link className='nav-link p-2 text-dark' to='/Look'>Looks</Link>
            <Link className='nav-link p-2 text-dark' to='/Login'>Login</Link>
            <Link className='nav-link p-2 text-dark' to='/Cadastrar'>Cadastrar</Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="looks-container mt-5 pt-5">
        <h2 className="looks-title">Looks</h2>

        <Button variant="dark" onClick={handleShowModal}>Adicionar Roupas</Button>

        <div className="selected-clothes-container mt-4">
          {selectedClothes.map((item) => (
            <div key={item.id} className="clothing-item">
              <img src={item.imagem_url || item.image} alt="Roupa" className="clothing-image-small" />
              <FaTrash className="trash-icon" onClick={() => removeClothingFromLook(item.id)} />
            </div>
          ))}
        </div>

        <Form.Control
          type="text"
          placeholder="Nome do Look"
          value={lookTitle}
          onChange={(e) => setLookTitle(e.target.value)}
          className="mt-3"
        />

        <Button variant="dark" onClick={handleSaveLook} className="mt-3">Confirmar Look</Button>

        <div className="saved-looks-grid mt-4">
          {savedLooks.map((look, index) => (
            <Card key={index} className="look-card" onClick={() => handleShowDetailModal(look)}>
              <Card.Body>
                <Card.Title className="text-center">{look.title}</Card.Title>
                <div className="look-clothes-grid">
                  {look.clothes.map((item, i) => (
                    <img key={i} src={item.imagem_url || item.image} alt="Roupa" className="clothing-image-grid" />
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Roupas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Selecione até 3 peças de roupas:</h5>
            <div className="clothes-grid">
              {clothes.map((item) => (
                <div key={item.id} className="clothes-card" onClick={() => toggleClothingSelection(item)}>
                  <img
                    src={item.imagem_url || item.image}
                    alt="Roupa"
                    className="clothes-image"
                    style={{
                      border: clothesToAdd.find((clothing) => clothing.id === item.id) ? '2px solid blue' : 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
            <Button variant="primary" onClick={handleAddSelectedClothes} disabled={clothesToAdd.length > 3}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showDetailModal}
          onHide={handleCloseDetailModal}
          dialogClassName="modal-custom"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedLook?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="look-detail-grid">
              {selectedLook && selectedLook.clothes.map((item, i) => (
                <img key={i} src={item.imagem_url || item.image} alt="Roupa" className="clothing-image-detail" />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Looks;
