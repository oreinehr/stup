// src/components/Cart.js
import React, { useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [image, setImage] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Assuming response.data contains the URL of the uploaded image
            const newItem = { id: Date.now(), url: response.data.imageUrl };
            setCartItems([...cartItems, newItem]);
            setImage(null); // Clear the image input
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div>
            <h1>Image Cart</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Add to Cart</button>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                {cartItems.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', width: '150px' }}>
                        <img src={item.url} alt={`Cart Item ${item.id}`} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                        <button onClick={() => handleRemove(item.id)} style={{ display: 'block', width: '100%', padding: '5px', border: 'none', background: '#ff4d4d', color: '#fff', cursor: 'pointer' }}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;