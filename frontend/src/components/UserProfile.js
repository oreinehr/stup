import React, { useState } from 'react';
import '../components/styles.css';

// Componente de Perfil de Usuário
const UserProfile = () => {
  // Estado para armazenar informações do perfil
  const [profile, setProfile] = useState({
    name: 'Guilherme Reinehr',
    profileImage: 'https://via.placeholder.com/150',
  });

  // Estado para armazenar o catálogo de roupas
  const [wardrobe, setWardrobe] = useState([]);

  // Estado para armazenar a nova imagem e categoria
  const [newItem, setNewItem] = useState({ category: '' });
  const [imageFile, setImageFile] = useState(null);

  // Função para simular uma atualização de perfil
  const updateProfile = () => {
    setProfile({
      ...profile,
      name: 'Guilherme Reinehr',
      profileImage: 'https://via.placeholder.com/150/0000FF/808080?text=New+Image',
    });
  };

  // Função para adicionar uma nova peça ao catálogo
  const addToWardrobe = () => {
    if (imageFile && newItem.category) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItemData = {
          id: wardrobe.length + 1,
          image: reader.result,
          category: newItem.category
        };
        setWardrobe([...wardrobe, newItemData]);
        setNewItem({ category: '' }); // Limpar o formulário
        setImageFile(null); // Limpar o arquivo selecionado
      };
      reader.readAsDataURL(imageFile); // Ler o arquivo como URL de dados
    }
  };

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  // Função para lidar com a mudança do arquivo
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Função para remover um item do catálogo
  const removeItem = (id) => {
    setWardrobe(wardrobe.filter(item => item.id !== id));
  };

  return (
    <div className="profile-card">
      <img src={profile.profileImage} alt="Profile" className="profile-image" />
      <h2 className="profile-name">{profile.name}</h2>
      <button onClick={updateProfile} className="update-button">Atualizar Perfil</button>

      {/* Seção do catálogo de roupas */}
      <div className="wardrobe-catalog">
        <h3>Guarda-Roupas</h3>

        {/* Formulário para adicionar nova peça */}
        <div className="add-item-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <select
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="category-select"
          >
            <option value="" disabled>Escolha uma categoria</option>
            <option value="T-Shirt">Camiseta</option>
            <option value="Jeans">Calça</option>
            <option value="Shorts">Bermuda</option>
            <option value="Jacket">Casaco</option>
          </select>
          <button onClick={addToWardrobe} className="add-item-button">Adicionar Item</button>
        </div>

        <div className="wardrobe-items">
          {wardrobe.map(item => (
            <div key={item.id} className="wardrobe-item">
              <img src={item.image} alt={`Item ${item.id}`} className="wardrobe-image" />
              <p className="wardrobe-category">{item.category}</p>
              <button onClick={() => removeItem(item.id)} className="remove-item-button">Remover</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
