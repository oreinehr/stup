import React from 'react';
import './styles.css'; // Certifique-se de incluir os estilos acima

const ImageLook = ({ src, alt }) => (
  <div className="container-fullscreen">
    <div
      className="fullscreen-image"
      style={{ backgroundImage: `url(${require(`../img/${src}`)})` }}
    >
      {alt && <p style={{ display: 'none' }}>{alt}</p>}
    </div>
  </div>
);

export default ImageLook;
