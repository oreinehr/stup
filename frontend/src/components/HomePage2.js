import React from 'react';
import '../components/styles.css';

const HomePage2 = () => {
  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <div>
          <h1 style={styles.heading}>STYLE</h1>
          <h1 style={styles.heading}>UP.</h1>
        </div>
        <div style={styles.textSection}>
          <p style={styles.description}>
            <strong>SOBRE</strong><br />
            Seja bem vindo ao Style Up, o melhor site de estilização de vestuário pessoal.
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div style={styles.rightSection}>
        <img 
          src='/img/roupa.jpg'
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',  
  },
  leftSection: {
    backgroundColor: '#000',
    color: '#f5f5e5',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 40px',
  },
  heading: {
    fontSize: '10vw',
    marginLeft: '5vw',
    lineHeight: 0.9,
    fontFamily: 'Anton, sans-serif',  
  },
  textSection: {
    marginTop: '5vw', 
    marginLeft: '5vw',
  },
  description: {
    fontSize: '1.2vw',
    fontFamily: 'Inter, sans-serif',  
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default HomePage2;
