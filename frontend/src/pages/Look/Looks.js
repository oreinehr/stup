import React, { useState, useEffect } from 'react';
import '../../components/styles.css';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImageLook from '../../components/imageLook';

function Looks() {
  const [savedLooks, setSavedLooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({ casaco: null, camiseta: null, calca: null });
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar as roupas do guarda-roupa
    const fetchWardrobeItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/roupas/${localStorage.getItem('userId')}`);
        const data = await response.json();
        setWardrobeItems(data);
      } catch (error) {
        console.error('Erro ao carregar roupas do guarda-roupa:', error);
      }
    };

    fetchWardrobeItems();
  }, []);

  const handleAddLook = () => {
    if (!selectedItems.casaco || !selectedItems.camiseta || !selectedItems.calca) {
      alert('Por favor, selecione uma peça para cada categoria: Casaco, Camiseta e Calça.');
      return;
    }

    setSavedLooks((prevLooks) => [
      ...prevLooks,
      { id: Math.random().toString(36).substr(2, 9), ...selectedItems },
    ]);

    setSelectedItems({ casaco: null, camiseta: null, calca: null });
    setShowModal(false);
  };

  const handleSelectItem = (item, category) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: item,
    }));
  };

  const handleEnterCard = (lookId) => {
    // Redirecionar para a página do look
    navigate(`/look/${lookId}`);
  };

  return (
    <div>
       <div className="image-look mt-4">
      <ImageLook src="1.png" alt="Imagem de fundo"/>
      </div>
      <Navbar expand="lg" bg="white" className="shadow-sm py-3 px-4 fixed-top" style={{ height: '80px' }}>
        <Container>
          <NavbarBrand href="#">
            <img src="img/tipografia.png" alt="Logo" style={{ height: '160px' }} />
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse>
            <Nav className="ms-auto" id="basic-navbar-nav">
              <Nav.Item>
                <Link className="nav-link p-2 text-dark" to="/GuardaRoupa">Guarda-Roupa</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link p-2 text-dark" to="/Look">Looks</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link p-2 text-dark" to="/Login">Login</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link p-2 text-dark" to="/Cadastrar">Cadastrar</Link>
              </Nav.Item>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      
     
    

      <div className="looks-container mt-0">
        <button className="add-look-button mb-3" onClick={() => setShowModal(true)}>
          Criar Look
        </button>
      </div>
      
      <div className="saved-looks text-center">
  <div
    className="d-flex flex-wrap justify-content-center"
    style={{
      gap: '4vw', // Espaçamento entre os cartões
      margin: 'auto',
      
    }}
  >
    {savedLooks.map((look) => (
      <div
        className="card shadow-sm saved-look-card"
        key={look.id}
        onClick={() => handleEnterCard(look.id)}
      >
        <div className="card-body">
          <img
            src={look.casaco?.imagem_url}
            alt="Casaco"
            className="saved-look-image"
          />
          <img
            src={look.camiseta?.imagem_url}
            alt="Camiseta"
            className="saved-look-image"
          />
          <img
            src={look.calca?.imagem_url}
            alt="Calça"
            className="saved-look-image"
          />
        </div>
      </div>
    ))}
  </div>
</div>
      {/* Modal para selecionar roupas */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Escolher Roupas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wardrobe-items">
            <div className="row">
              <h5 className="col-12 text-center">Casacos</h5>
              {wardrobeItems
                .filter((item) => item.categoria === 'casaco')
                .map((item) => (
                  <div className="col-md-4 mb-2" key={item.roupa_id}>
                    <div
                      className={`card shadow-sm ${
                        selectedItems.casaco?.roupa_id === item.roupa_id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleSelectItem(item, 'casaco')}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={item.imagem_url}
                        alt="Casaco"
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}

              <h5 className="col-12 text-center mt-3">Camisetas</h5>
              {wardrobeItems
                .filter((item) => item.categoria === 'camiseta')
                .map((item) => (
                  <div className="col-md-4 mb-2" key={item.roupa_id}>
                    <div
                      className={`card shadow-sm ${
                        selectedItems.camiseta?.roupa_id === item.roupa_id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleSelectItem(item, 'camiseta')}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={item.imagem_url}
                        alt="Camiseta"
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}

              <h5 className="col-12 text-center mt-3">Calças</h5>
              {wardrobeItems
                .filter((item) => item.categoria === 'calca')
                .map((item) => (
                  <div className="col-md-4 mb-2" key={item.roupa_id}>
                    <div
                      className={`card shadow-sm ${
                        selectedItems.calca?.roupa_id === item.roupa_id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleSelectItem(item, 'calca')}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={item.imagem_url}
                        alt="Calça"
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddLook}>
            Salvar Look
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="image-look mt-0">
      <ImageLook src="2.png" alt="Imagem de fundo"/>
      </div>
    </div>
  
  );
}

export default Looks;
