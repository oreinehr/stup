import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = () => {
    const [file, setFile] = useState(null);
    const [categoria, setCategoria] = useState('');
    const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('categoria', categoria);

        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
                },
            });
            alert('Foto enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a foto:', error);
            alert('Erro ao enviar a foto.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <input 
                type="text" 
                value={categoria} 
                onChange={handleCategoriaChange} 
                placeholder="Categoria" 
            />
            <button type="submit">Enviar Foto</button>
        </form>
    );
};

export default UploadPhoto;
