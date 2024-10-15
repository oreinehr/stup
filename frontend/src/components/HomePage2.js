import React from 'react';
import '../components/styles.css'; // Certifique-se de que o caminho está correto

const HomePage2 = () => {
  return (
    <div className="containerHome2">
      {/* Left Section */}
      <div className="leftSectionHome2">
        <div>
          <h1 className="headingHome2">STYLE</h1>
          <h1 className="headingHome2">UP.</h1>
        </div>
        <div className="textSectionHome2">
          <p className="descriptionHome2">
            <strong>SOBRE</strong><br />
            Seja bem vindo ao Style Up, o melhor site de estilização de vestuário pessoal.
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="rightSectionHome2">
        <img 
          src='/img/roupa.jpg'
          className="imageHome2"
          alt="Vestuário"
        />
      </div>
    </div>
  );
};

export default HomePage2;